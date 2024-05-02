from django.apps import AppConfig


class EcomappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ecomApp'

    def ready(self):
        import ecomApp.signals
