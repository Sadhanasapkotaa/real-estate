from rest_framework import serializers
from .models import JointDevelopment, Expense, BudgetAllocation, Plan

class JointDevelopmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = JointDevelopment
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class BudgetAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetAllocation
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'
