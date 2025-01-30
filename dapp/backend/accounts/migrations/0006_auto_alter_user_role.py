from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_merge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.JSONField(default=list),
        ),
    ]
