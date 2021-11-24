import smtplib
from django.conf import settings
from app.celery import app

@app.task(bind=True)
def send_mail(self, email, username, time=60):
  try:
    server = smtplib.SMTP(settings.ADMIN_EMAIL_PROTOCOL, 587)
    server.starttls()
    server.login(settings.ADMIN_EMAIL, settings.ADMIN_PASSWORD)
    server.sendmail(settings.ADMIN_EMAIL, email, "Hello, " + username + " thank you for registration")
    server.close()
  except Exception:
    time *= 2
    raise self.retry(exc=Exception, countdown=time)