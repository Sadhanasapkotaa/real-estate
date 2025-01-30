from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError
from property.models import Property  # Correct import for Property model

class JointDevelopment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="joint_developments",
        verbose_name="Property"
    )
    owners = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="joint_developments",
        verbose_name="Property Owners"
    )
    investors = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="investor_developments",
        blank=True,
        verbose_name="Investors"
    )
    contractors = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="contractor_developments",
        blank=True,
        verbose_name="Contractors"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name="Development Status"
    )
    start_date = models.DateField(null=True, blank=True, verbose_name="Start Date")
    expected_completion_date = models.DateField(null=True, blank=True, verbose_name="Expected Completion Date")
    actual_completion_date = models.DateField(
        null=True, blank=True, verbose_name="Actual Completion Date"
    )
    budget = models.DecimalField(
        max_digits=12, decimal_places=2, verbose_name="Budget"
    )
    description = models.TextField(blank=True, verbose_name="Description")
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium',
        verbose_name="Priority"
    )
    modified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="modified_joint_developments",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Modified By"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    total_expenses_cached = models.DecimalField(
        max_digits=12, decimal_places=2, default=0, verbose_name="Total Expenses Cached"
    )

    @property
    def total_expenses(self):
        # Optimize by using cached value
        return self.total_expenses_cached or self.expenses.aggregate(total=models.Sum('amount'))['total'] or 0

    def update_total_expenses(self):
        self.total_expenses_cached = self.expenses.aggregate(total=models.Sum('amount'))['total'] or 0
        self.save()

    @property
    def remaining_budget(self):
        return self.budget - self.total_expenses

    def clean(self):
        if self.budget < 0:
            raise ValidationError("Budget cannot be negative.")

    @property
    def completion_percentage(self):
        if not self.start_date or not self.expected_completion_date:
            return 0  # Unable to calculate if start or expected completion date is not set
        if not self.actual_completion_date:
            return 0  # If there's no actual completion date, return 0 or handle as per your requirement

        total_duration = (self.expected_completion_date - self.start_date).days
        completed_duration = (self.actual_completion_date - self.start_date).days
        return (completed_duration / total_duration) * 100

    @property
    def date_range(self):
        return f"{self.start_date} to {self.expected_completion_date if self.expected_completion_date else 'TBD'}"

    def __str__(self):
        return f"Joint Development for {self.property.title}"

    class Meta:
        verbose_name = "Joint Development"
        verbose_name_plural = "Joint Developments"


class Expense(models.Model):
    joint_development = models.ForeignKey(
        JointDevelopment,
        related_name="expenses",
        on_delete=models.CASCADE,
        verbose_name="Joint Development"
    )
    plan = models.ForeignKey(
        Plan,  # Link the expense to a specific plan
        related_name="expenses",
        null=True, blank=True,  # Allow an expense to be shared across all plans if not allocated
        on_delete=models.CASCADE,
        verbose_name="Plan"
    )
    date = models.DateField(verbose_name="Expense Date")
    category = models.CharField(
        max_length=50,
        choices=[
            ('material', 'Material'),
            ('labor', 'Labor'),
            ('permit', 'Permit'),
            ('other', 'Other'),
        ],
        verbose_name="Expense Category"
    )
    description = models.TextField(verbose_name="Description", blank=True)
    amount = models.DecimalField(
        max_digits=12, decimal_places=2, verbose_name="Expense Amount"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category.capitalize()} - ${self.amount} on {self.date}"

    class Meta:
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"


class BudgetAllocation(models.Model):
    joint_development = models.ForeignKey(
        JointDevelopment,
        related_name="budget_allocations",
        on_delete=models.CASCADE,
        verbose_name="Joint Development"
    )
    plan = models.ForeignKey(
        Plan,  # Link allocation to a specific plan
        related_name="budget_allocations",
        null=True, blank=True,
        on_delete=models.CASCADE,
        verbose_name="Plan"
    )
    category = models.CharField(
        max_length=50,
        choices=[
            ('material', 'Material'),
            ('labor', 'Labor'),
            ('permit', 'Permit'),
            ('other', 'Other'),
        ],
        verbose_name="Budget Category"
    )
    allocated_amount = models.DecimalField(
        max_digits=12, decimal_places=2, verbose_name="Allocated Amount"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category.capitalize()} - ${self.allocated_amount}"

    @property
    def total_spent(self):
        return self.joint_development.expenses.filter(category=self.category, plan=self.plan).aggregate(
            total=models.Sum('amount')
        )['total'] or 0

    @property
    def remaining(self):
        return self.allocated_amount - self.total_spent

    class Meta:
        verbose_name = "Budget Allocation"
        verbose_name_plural = "Budget Allocations"


class Plan(models.Model):
    PLAN_LEVELS = [
        ('yearly', 'Yearly'),
        ('monthly', 'Monthly'),
        ('weekly', 'Weekly'),
        ('daily', 'Daily'),
    ]

    joint_development = models.ForeignKey(
        JointDevelopment,
        related_name="plans",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255, help_text="Name of the plan.")
    description = models.TextField(blank=True, help_text="Detailed description of the plan.")
    level = models.CharField(max_length=10, choices=PLAN_LEVELS, help_text="Level of the plan.")
    start_date = models.DateField(help_text="Start date of the plan.")
    end_date = models.DateField(help_text="End date of the plan.")
    is_completed = models.BooleanField(default=False, help_text="Whether the plan is completed.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.level.capitalize()})"

    class Meta:
        verbose_name = "Plan"
        verbose_name_plural = "Plans"
