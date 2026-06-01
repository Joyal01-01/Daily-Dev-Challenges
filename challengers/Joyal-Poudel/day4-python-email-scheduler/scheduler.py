import schedule
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import json
import os

class EmailScheduler:
    def __init__(self, sender_email, sender_password):
        """Initialize the email scheduler with credentials"""
        self.sender_email = sender_email
        self.sender_password = sender_password
        self.jobs = []
        self.scheduled_emails = []
        
    def send_email(self, recipient_email, subject, body, html=False):
        """Send an email"""
        try:
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.sender_email
            message["To"] = recipient_email
            
            if html:
                part = MIMEText(body, "html")
            else:
                part = MIMEText(body, "plain")
                
            message.attach(part)
            
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, recipient_email, message.as_string())
                
            print(f"✓ Email sent to {recipient_email} at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            return True
            
        except Exception as e:
            print(f"✗ Failed to send email: {str(e)}")
            return False
    
    def schedule_email(self, recipient_email, subject, body, time_str, repeat='once', html=False):
        """Schedule an email to be sent at a specific time
        
        Args:
            recipient_email: Email address of recipient
            subject: Email subject
            body: Email body
            time_str: Time in HH:MM format (24-hour)
            repeat: 'once', 'daily', 'weekly', 'monthly'
            html: Whether body is HTML
        """
        job_info = {
            'recipient': recipient_email,
            'subject': subject,
            'body': body,
            'time': time_str,
            'repeat': repeat,
            'html': html,
            'created_at': datetime.now().isoformat()
        }
        
        if repeat == 'once':
            job = schedule.at(time_str).do(
                self.send_email, 
                recipient_email, 
                subject, 
                body,
                html
            )
        elif repeat == 'daily':
            job = schedule.every().day.at(time_str).do(
                self.send_email,
                recipient_email,
                subject,
                body,
                html
            )
        elif repeat == 'weekly':
            job = schedule.every().monday.at(time_str).do(
                self.send_email,
                recipient_email,
                subject,
                body,
                html
            )
        elif repeat == 'monthly':
            # Approximate monthly schedule (every 30 days)
            job = schedule.every(30).days.at(time_str).do(
                self.send_email,
                recipient_email,
                subject,
                body,
                html
            )
        
        self.jobs.append(job)
        self.scheduled_emails.append(job_info)
        print(f"✓ Scheduled email to {recipient_email} at {time_str} ({repeat})")
        
        return job
    
    def list_scheduled_emails(self):
        """List all scheduled emails"""
        if not self.scheduled_emails:
            print("No scheduled emails")
            return
        
        print("\n📧 Scheduled Emails:")
        print("=" * 80)
        for idx, email in enumerate(self.scheduled_emails, 1):
            print(f"\n{idx}. To: {email['recipient']}")
            print(f"   Subject: {email['subject']}")
            print(f"   Time: {email['time']} ({email['repeat']})")
            print(f"   Created: {email['created_at']}")
    
    def cancel_job(self, job_id):
        """Cancel a scheduled job"""
        if job_id < len(self.jobs):
            schedule.cancel_job(self.jobs[job_id])
            del self.jobs[job_id]
            del self.scheduled_emails[job_id]
            print(f"✓ Job {job_id} cancelled")
        else:
            print("Invalid job ID")
    
    def run(self):
        """Start the scheduler loop"""
        print("📬 Email Scheduler started...")
        print("Press Ctrl+C to stop\n")
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
        except KeyboardInterrupt:
            print("\n✓ Scheduler stopped")
    
    def get_next_run(self):
        """Get the next scheduled email"""
        if not schedule.jobs:
            return None
        return schedule.idle_seconds()


def demo():
    """Demo the email scheduler"""
    # Configuration
    SENDER_EMAIL = "your_email@gmail.com"
    SENDER_PASSWORD = "your_app_password"  # Use Google App Password
    
    # Create scheduler
    scheduler = EmailScheduler(SENDER_EMAIL, SENDER_PASSWORD)
    
    # Example: Schedule emails
    print("🔧 Setting up email schedules...\n")
    
    # Daily reminder
    scheduler.schedule_email(
        recipient_email="recipient@example.com",
        subject="Daily Reminder - Check Your Tasks",
        body="""Hello!

This is your daily reminder to check your tasks.

Have a great day!

Best regards,
Automated Scheduler""",
        time_str="09:00",
        repeat="daily"
    )
    
    # Weekly newsletter
    scheduler.schedule_email(
        recipient_email="subscriber@example.com",
        subject="Weekly Newsletter",
        body="""<html>
        <body>
            <h2>This Week's Highlights</h2>
            <p>Stay updated with the latest news!</p>
            <ul>
                <li>News 1</li>
                <li>News 2</li>
                <li>News 3</li>
            </ul>
        </body>
        </html>""",
        time_str="10:30",
        repeat="weekly",
        html=True
    )
    
    # One-time email
    scheduler.schedule_email(
        recipient_email="user@example.com",
        subject="Special Offer - Limited Time",
        body="Check out our special offer today only!",
        time_str="14:00",
        repeat="once"
    )
    
    # List scheduled emails
    scheduler.list_scheduled_emails()
    
    print("\n" + "=" * 80)
    print("Note: Replace email credentials with your actual Gmail account")
    print("Use Google App Password for authentication")
    print("=" * 80 + "\n")
    
    # Uncomment to run the scheduler
    # scheduler.run()


if __name__ == "__main__":
    demo()
