# Generated by Django 5.1.4 on 2025-01-09 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("property", "0008_booking_end_date_booking_start_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="location",
            field=models.CharField(max_length=255),
        ),
    ]
