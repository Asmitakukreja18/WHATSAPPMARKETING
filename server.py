import http.server
import socketserver
import json
import os
import urllib.parse
import urllib.request
import time
import uuid

PORT = 5000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
os.makedirs(DATA_DIR, exist_ok=True)

LEADS_FILE = os.path.join(DATA_DIR, 'leads.json')
CONTACTS_FILE = os.path.join(DATA_DIR, 'contacts.json')
CAMPAIGNS_FILE = os.path.join(DATA_DIR, 'campaigns.json')

def load_json(filepath, default=[]):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return default
    return default

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Sample Pre-approved WhatsApp Templates
DEFAULT_TEMPLATES = [
    {
        "id": "tpl_growth_audit_confirm",
        "name": "growth_audit_confirmation",
        "category": "MARKETING",
        "language": "en",
        "status": "APPROVED",
        "header": "🚀 NextReach Growth Pod Update",
        "body": "Hi {{1}}, thank you for booking a Free Growth Audit for {{2}}. Our Director is reviewing your pipeline. Your call is scheduled for {{3}}.",
        "buttons": [
            {"type": "QUICK_REPLY", "text": "Confirm Call 📞"},
            {"type": "URL", "text": "View Case Studies 📈", "url": "https://nextreachdms.com/case-studies.html"}
        ]
    },
    {
        "id": "tpl_broadcast_offer",
        "name": "exclusive_flash_offer",
        "category": "MARKETING",
        "language": "en",
        "status": "APPROVED",
        "header": "🔥 Exclusive WhatsApp Growth Blueprint",
        "body": "Hi {{1}}, scale your brand revenue by 3.5x using Meta Verified Automation & High-ROAS CAPI ads. Reply START to claim your free 90-day roadmap.",
        "buttons": [
            {"type": "QUICK_REPLY", "text": "START 🚀"},
            {"type": "QUICK_REPLY", "text": "Talk to Director 💬"}
        ]
    }
]

class NextReachBackendHandler(http.server.SimpleHTTPRequestHandler):
    
    def _send_json_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # 1. API: Get Leads
        if path == '/api/leads':
            leads = load_json(LEADS_FILE, [])
            return self._send_json_response(200, {"success": True, "count": len(leads), "leads": leads})

        # 2. API: Get Contacts
        if path == '/api/contacts':
            contacts = load_json(CONTACTS_FILE, [])
            return self._send_json_response(200, {"success": True, "count": len(contacts), "contacts": contacts})

        # 3. API: WhatsApp Templates
        if path == '/api/whatsapp/templates':
            return self._send_json_response(200, {"success": True, "templates": DEFAULT_TEMPLATES})

        # 4. API: WhatsApp Campaigns Analytics
        if path == '/api/whatsapp/campaigns':
            campaigns = load_json(CAMPAIGNS_FILE, [])
            return self._send_json_response(200, {"success": True, "campaigns": campaigns})

        # 5. API: WhatsApp Webhook Verification (Meta Standard)
        if path == '/api/whatsapp/webhook':
            query_params = urllib.parse.parse_qs(parsed.query)
            hub_mode = query_params.get('hub.mode', [''])[0]
            hub_verify_token = query_params.get('hub.verify_token', [''])[0]
            hub_challenge = query_params.get('hub.challenge', [''])[0]

            VERIFY_TOKEN = "nextreach_wa_secret_2026"
            if hub_mode == "subscribe" and hub_verify_token == VERIFY_TOKEN:
                self.send_response(200)
                self.send_header('Content-Type', 'text/plain')
                self.end_headers()
                self.wfile.write(hub_challenge.encode('utf-8'))
                return
            else:
                return self._send_json_response(403, {"error": "Webhook verification failed"})

        # Default: Serve static files
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        content_len = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_len) if content_len > 0 else b'{}'
        
        try:
            payload = json.loads(post_body.decode('utf-8'))
        except Exception:
            payload = {}

        # 1. API: Lead Capture (Audit / Consultation / Demo)
        if path in ['/api/leads', '/api/audit', '/api/demo']:
            name = payload.get('name', '').strip()
            phone = payload.get('phone', '').strip()
            email = payload.get('email', '').strip()
            service = payload.get('service', 'Growth Audit & Paid Media')
            ad_spend = payload.get('ad_spend', '₹1L - ₹5L/month')
            notes = payload.get('notes', '')

            if not name or not phone:
                return self._send_json_response(400, {
                    "success": False, 
                    "error": "Name and Phone number are required."
                })

            lead_entry = {
                "id": f"LEAD_{int(time.time())}_{uuid.uuid4().hex[:6]}",
                "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
                "name": name,
                "phone": phone,
                "email": email,
                "service": service,
                "ad_spend": ad_spend,
                "notes": notes,
                "status": "NEW_INQUIRY",
                "wa_notification_sent": True
            }

            leads = load_json(LEADS_FILE, [])
            leads.insert(0, lead_entry)
            save_json(LEADS_FILE, leads)

            return self._send_json_response(200, {
                "success": True,
                "message": f"Thank you {name}! Your growth audit request has been registered. Our Senior Growth Director will call you at {phone}.",
                "lead_id": lead_entry["id"]
            })

        # 2. API: Direct Contact Form Submission
        if path == '/api/contact':
            name = payload.get('name', '').strip()
            email = payload.get('email', '').strip()
            phone = payload.get('phone', '').strip()
            message = payload.get('message', '').strip()

            if not name or not (email or phone):
                return self._send_json_response(400, {
                    "success": False, 
                    "error": "Name and at least one contact method (email/phone) are required."
                })

            contact_entry = {
                "id": f"MSG_{int(time.time())}_{uuid.uuid4().hex[:6]}",
                "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
                "name": name,
                "email": email,
                "phone": phone,
                "message": message,
                "status": "UNREAD"
            }

            contacts = load_json(CONTACTS_FILE, [])
            contacts.insert(0, contact_entry)
            save_json(CONTACTS_FILE, contacts)

            return self._send_json_response(200, {
                "success": True,
                "message": f"Thank you {name}! Your message has been received. Our team will get back to you within 4 hours.",
                "message_id": contact_entry["id"]
            })

        # Helper: Dispatch WhatsApp Message to Meta Cloud API
        def send_meta_wa(recipient, media_type, text, media_url, template_id, token, phone_id):
            if not token or token == "YOUR_META_TOKEN_HERE":
                return {
                    "success": True,
                    "recipient": recipient,
                    "message_id": f"wamid.HBgL{uuid.uuid4().hex[:16]}",
                    "status": "DELIVERED_SIMULATED",
                    "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
                    "note": "Delivered in Test/Mock Mode. Add real Meta Token & Phone ID in Settings for live WhatsApp delivery."
                }

            url = f"https://graph.facebook.com/v19.0/{phone_id}/messages"
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }

            data = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": recipient
            }

            if media_type == "image":
                data["type"] = "image"
                data["image"] = {"link": media_url}
                if text:
                    data["image"]["caption"] = text
            elif media_type == "video":
                data["type"] = "video"
                data["video"] = {"link": media_url}
                if text:
                    data["video"]["caption"] = text
            elif media_type == "document":
                data["type"] = "document"
                data["document"] = {"link": media_url, "filename": "Document.pdf"}
                if text:
                    data["document"]["caption"] = text
            elif media_type == "template":
                data["type"] = "template"
                data["template"] = {
                    "name": template_id or "hello_world",
                    "language": {"code": "en_US"}
                }
            else:
                data["type"] = "text"
                data["text"] = {"preview_url": True, "body": text or "Hello from Marketiqx!"}

            try:
                req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
                with urllib.request.urlopen(req) as response:
                    res_body = json.loads(response.read().decode('utf-8'))
                
                msg_id = res_body.get('messages', [{}])[0].get('id', f"wamid.{uuid.uuid4().hex[:12]}")
                return {
                    "success": True,
                    "recipient": recipient,
                    "message_id": msg_id,
                    "status": "SENT_TO_META",
                    "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
                }
            except Exception as e:
                err_msg = str(e)
                if hasattr(e, 'read'):
                    try:
                        err_json = json.loads(e.read().decode('utf-8'))
                        err_msg = err_json.get('error', {}).get('message', str(err_json))
                    except Exception:
                        pass
                return {
                    "success": False,
                    "recipient": recipient,
                    "error": err_msg,
                    "status": "FAILED",
                    "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
                }

        # 3. API: Send Individual WhatsApp Message
        if path == '/api/whatsapp/send-single':
            recipient = payload.get('recipient_phone', '').strip().replace('+', '').replace(' ', '').replace('-', '')
            media_type = payload.get('media_type', 'text')
            text = payload.get('message_text', payload.get('text', '')).strip()
            media_url = payload.get('media_url', '').strip()
            template_id = payload.get('template_id', 'hello_world')
            token = payload.get('meta_token') or os.getenv("META_ACCESS_TOKEN", "YOUR_META_TOKEN_HERE")
            phone_id = payload.get('phone_number_id') or os.getenv("META_PHONE_NUMBER_ID", "YOUR_PHONE_ID_HERE")

            if not recipient:
                return self._send_json_response(400, {"success": False, "error": "Recipient phone number is required"})

            res = send_meta_wa(recipient, media_type, text, media_url, template_id, token, phone_id)
            status_code = 200 if res.get('success') else 400
            return self._send_json_response(status_code, res)

        # 4. API: WhatsApp Bulk Broadcast Dispatcher
        if path == '/api/whatsapp/send-bulk':
            campaign_name = payload.get('campaign_name', f"Broadcast_{time.strftime('%Y%m%d_%H%M')}")
            recipients = payload.get('recipients', [])
            media_type = payload.get('media_type', 'text')
            text = payload.get('message_text', '').strip()
            media_url = payload.get('media_url', '').strip()
            template_id = payload.get('template_id', '')
            token = payload.get('meta_token') or os.getenv("META_ACCESS_TOKEN", "YOUR_META_TOKEN_HERE")
            phone_id = payload.get('phone_number_id') or os.getenv("META_PHONE_NUMBER_ID", "YOUR_PHONE_ID_HERE")

            if not recipients or not isinstance(recipients, list):
                return self._send_json_response(400, {
                    "success": False, 
                    "error": "Recipients must be a non-empty list of phone numbers."
                })

            results = []
            delivered_count = 0
            failed_count = 0

            for raw_number in recipients:
                num_str = str(raw_number).strip().replace('+', '').replace(' ', '').replace('-', '')
                if not num_str:
                    continue
                
                result = send_meta_wa(num_str, media_type, text, media_url, template_id, token, phone_id)
                results.append(result)
                if result.get('success'):
                    delivered_count += 1
                else:
                    failed_count += 1

            campaign_record = {
                "campaign_id": f"CAMP_{int(time.time())}_{uuid.uuid4().hex[:6]}",
                "name": campaign_name,
                "media_type": media_type,
                "created_at": time.strftime('%Y-%m-%d %H:%M:%S'),
                "total_targets": len(results),
                "delivered": delivered_count,
                "failed": failed_count,
                "status": "COMPLETED" if failed_count == 0 else ("PARTIAL" if delivered_count > 0 else "FAILED"),
                "results": results
            }

            campaigns = load_json(CAMPAIGNS_FILE, [])
            campaigns.insert(0, campaign_record)
            save_json(CAMPAIGNS_FILE, campaigns)

            return self._send_json_response(200, {
                "success": True,
                "message": f"Broadcast processed! {delivered_count} delivered, {failed_count} failed.",
                "campaign": campaign_record
            })

        # 5. API: WhatsApp Webhook Receiver
        if path == '/api/whatsapp/webhook':
            return self._send_json_response(200, {"status": "EVENT_RECEIVED"})

        return self._send_json_response(404, {"error": "API endpoint not found"})

def run_server():
    os.chdir(BASE_DIR)
    with socketserver.TCPServer(("", PORT), NextReachBackendHandler) as httpd:
        print("============================================================")
        print("Server NextReach DMS & WhatsApp Marketing Engine Backend Live")
        print(f"Base URL: http://localhost:{PORT}/")
        print(f"NextReach Portal: http://localhost:{PORT}/nextreach/index.html")
        print("REST API Endpoints:")
        print("   - POST /api/leads            (Lead Capture & Audit)")
        print("   - POST /api/contact          (Direct Inquiries)")
        print(f"   - POST /api/whatsapp/send-single")
        print(f"   - POST /api/whatsapp/send-bulk (Bulk Messaging Engine)")
        print(f"   - GET  /api/whatsapp/templates")
        print(f"   - POST /api/whatsapp/webhook   (Meta Cloud API Webhook)")
        print(f"============================================================")
        httpd.serve_forever()

if __name__ == '__main__':
    run_server()
