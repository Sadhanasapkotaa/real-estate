from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('supplier', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='supplier',
            name='supplier_image',
            field=models.ImageField(upload_to='suppliers/%Y/%m/%d', blank=True, null=True),
        ),
    ]
