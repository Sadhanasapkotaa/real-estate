from django.contrib import admin
from .models import JointDevelopment, Expense, BudgetAllocation, Plan

admin.site.register(JointDevelopment)
admin.site.register(Expense)
admin.site.register(BudgetAllocation)
admin.site.register(Plan)
