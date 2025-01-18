from django.db import models
from django.conf import settings
from multiselectfield import MultiSelectField

class Property(models.Model):
    SALE_RENT_CHOICES = [
        ('sale', 'For Sale'),
        ('rent', 'For Rent'),
    ]

    PROPERTY_TYPE_CHOICES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('condo', 'Condo'),
        ('land', 'Land'),
    ]

    AMENITIES_CHOICES = [
        ('garage', 'Garage'),
        ('pool', 'Pool'),
        ('fireplace', 'Fireplace'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('booked', 'Booked'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
        ('off_market', 'Off Market'),
        ('unapproved', 'Unapproved'),
    ]

    TAG_CHOICES = [
        ('featured', 'Featured'),
        ('hot_deal', 'Hot Deal'),
    ]

    DISTRICT_CHOICES = [
        # Province 1
        ('bhojpur', 'Bhojpur'),
        ('dhankuta', 'Dhankuta'),
        ('ilam', 'Ilam'),
        ('jhapa', 'Jhapa'),
        ('khotang', 'Khotang'),
        ('morang', 'Morang'),
        ('okhaldhunga', 'Okhaldhunga'),
        ('panchthar', 'Panchthar'),
        ('sankhuwasabha', 'Sankhuwasabha'),
        ('solukhumbu', 'Solukhumbu'),
        ('sunsari', 'Sunsari'),
        ('taplejung', 'Taplejung'),
        ('terhathum', 'Terhathum'),
        ('udayapur', 'Udayapur'),
        # Madhesh Pradesh
        ('bara', 'Bara'),
        ('dhanusha', 'Dhanusha'),
        ('mahottari', 'Mahottari'),
        ('parsa', 'Parsa'),
        ('rautahat', 'Rautahat'),
        ('saptari', 'Saptari'),
        ('sarlahi', 'Sarlahi'),
        ('siraha', 'Siraha'),
        # Bagmati Province
        ('bhaktapur', 'Bhaktapur'),
        ('chitwan', 'Chitwan'),
        ('dhading', 'Dhading'),
        ('dolakha', 'Dolakha'),
        ('kathmandu', 'Kathmandu'),
        ('kavrepalanchok', 'Kavrepalanchok'),
        ('lalitpur', 'Lalitpur'),
        ('makwanpur', 'Makwanpur'),
        ('nuwakot', 'Nuwakot'),
        ('ramechhap', 'Ramechhap'),
        ('rasuwa', 'Rasuwa'),
        ('sindhuli', 'Sindhuli'),
        ('sindhupalchok', 'Sindhupalchok'),
        # Gandaki
        ('baglung', 'Baglung'),
        ('gorkha', 'Gorkha'),
        ('kaski', 'Kaski'),
        ('lamjung', 'Lamjung'),
        ('manang', 'Manang'),
        ('mustang', 'Mustang'),
        ('myagdi', 'Myagdi'),
        ('nawalpur', 'Nawalpur'),
        ('parbat', 'Parbat'),
        ('syangja', 'Syangja'),
        ('tanahun', 'Tanahun'),
        # Lumbini
        ('arghakhanchi', 'Arghakhanchi'),
        ('banke', 'Banke'),
        ('bardiya', 'Bardiya'),
        ('dang', 'Dang'),
        ('gulmi', 'Gulmi'),
        ('kapilvastu', 'Kapilvastu'),
        ('palpa', 'Palpa'),
        ('parasi', 'Parasi'),
        ('pyuthan', 'Pyuthan'),
        ('rolpa', 'Rolpa'),
        ('rupandehi', 'Rupandehi'),
        # Karnali
        ('dailekh', 'Dailekh'),
        ('dolpa', 'Dolpa'),
        ('humla', 'Humla'),
        ('jumla', 'Jumla'),
        ('kalikot', 'Kalikot'),
        ('mugu', 'Mugu'),
        ('rukum_west', 'Rukum West'),
        ('salyan', 'Salyan'),
        ('surkhet', 'Surkhet'),
        # Sudurpaschim
        ('achham', 'Achham'),
        ('baitadi', 'Baitadi'),
        ('bajhang', 'Bajhang'),
        ('bajura', 'Bajura'),
        ('dadeldhura', 'Dadeldhura'),
        ('darchula', 'Darchula'),
        ('kanchanpur', 'Kanchanpur'),
        ('kailali', 'Kailali'),
        ('doti', 'Doti'),
    ]

    title = models.CharField(max_length=200, verbose_name="Property Title")
    description = models.TextField(verbose_name="Property Description")
    map_link = models.TextField(verbose_name="Property Map")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, verbose_name="Property Status")
    province = models.CharField(max_length=20, verbose_name="Province")
    district = models.CharField(max_length=50, choices=DISTRICT_CHOICES, verbose_name="District")
    city = models.CharField(max_length=100, verbose_name="City")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")
    bed = models.IntegerField(verbose_name="Number of Bedrooms")
    bath = models.IntegerField(verbose_name="Number of Bathrooms")
    area = models.IntegerField(help_text="Area in square feet", verbose_name="Area (sq ft)")
    plot_number = models.DecimalField(max_digits=10, decimal_places=2, help_text="Lot size in acres", verbose_name="Plot Number")
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/', verbose_name="Main Photo")
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, verbose_name="Photo 1")
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, verbose_name="Photo 2")
    photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, verbose_name="Photo 3")
    photo_4 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, verbose_name="Photo 4")
    photo_5 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, verbose_name="Photo 5")
    realtor = models.ForeignKey('Realtor', on_delete=models.CASCADE, verbose_name="Realtor")
    sale_or_rent = models.CharField(max_length=4, choices=SALE_RENT_CHOICES, verbose_name="Sale or Rent")
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES, verbose_name="Property Type")
    year_built = models.IntegerField(verbose_name="Year Built")
    total_floors = models.IntegerField(null=True, blank=True, verbose_name="Total Floors")
    floor_number = models.IntegerField(null=True, blank=True, help_text="Applicable for apartments or multi-story buildings", verbose_name="Floor Number")
    amenities = MultiSelectField(choices=AMENITIES_CHOICES, blank=True, verbose_name="Amenities")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties', verbose_name="Owner")
    tags = models.CharField(max_length=20, choices=TAG_CHOICES, blank=True, verbose_name="Tags")
    documents = models.FileField(upload_to='documents/%Y/%m/%d/', blank=True, verbose_name="Documents")
    updated_date = models.DateTimeField(auto_now=True, verbose_name="Last Updated")
    added_date = models.DateTimeField(auto_now_add=True, verbose_name="Date Added")

    def __str__(self):
        return str(self.title)
    

class Realtor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="User")
    photo = models.ImageField(upload_to='realtors/%Y/%m/%d/', blank=True, verbose_name="Photo")
    description = models.TextField(blank=True, verbose_name="Description")
    is_mvp = models.BooleanField(default=False, verbose_name="MVP Status")
    hire_date = models.DateTimeField(auto_now_add=True, verbose_name="Hire Date")

    def __str__(self):
        return str(self.user)
