# Generated by Django 5.1.4 on 2025-01-07 08:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("property", "0004_property_image1_property_image2_property_image3_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="property",
            name="image1",
        ),
        migrations.RemoveField(
            model_name="property",
            name="image2",
        ),
        migrations.RemoveField(
            model_name="property",
            name="image3",
        ),
        migrations.RemoveField(
            model_name="property",
            name="image4",
        ),
        migrations.RemoveField(
            model_name="property",
            name="image5",
        ),
    ]