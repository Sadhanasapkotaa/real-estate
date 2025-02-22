# Generated by Django 5.1.5 on 2025-01-21 07:40

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("property", "0002_property_average_negotiation_price_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True,
                default=django.utils.timezone.now,
                verbose_name="Created At",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="property",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, verbose_name="Updated At"),
        ),
        migrations.AddField(
            model_name="realtor",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True,
                default=django.utils.timezone.now,
                verbose_name="Created At",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="realtor",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, verbose_name="Updated At"),
        ),
    ]
