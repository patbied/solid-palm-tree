# Generated by Django 4.2.3 on 2023-07-21 12:18

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0005_alter_product_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="createdAt",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]
