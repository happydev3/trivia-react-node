from django.contrib import admin
from .models import TradeIdea

class TradeIdeaListFilter(admin.SimpleListFilter):

    """
    This filter will always return a subset of the instances in a Model, either filtering by the
    user choice or by a default value.
    """
    # Human-readable title which will be displayed in the
    # right admin sidebar just above the filter options.
    title = 'trade_status_flag'

    # Parameter for the filter that will be used in the URL query.
    parameter_name = 'trade_status_flag'

    default_value = None

    def lookups(self, request, model_admin):
        """
        Returns a list of tuples. The first element in each
        tuple is the coded value for the option that will
        appear in the URL query. The second element is the
        human-readable name for the option that will appear
        in the right sidebar.
        """
        return [
        ('waiting', 'waiting'),
        ('success', 'success'),
        ('failed', 'failed')
        ]
        # list_of_species = []
        # queryset = TradeIdea.objects.all()
        # for species in queryset:
        #     list_of_species.append(
        #         (str(species.id), species.trade_status_flag)
        #     )
        # return sorted(list_of_species, key=lambda tp: tp[1])

    def queryset(self, request, queryset):

        """
        Returns the filtered queryset based on the value
        provided in the query string and retrievable via
        `self.value()`.
        """
        # Compare the requested value to decide how to filter the queryset.
        if self.value():
            return queryset.filter(trade_status_flag=self.value())
        return queryset

    def value(self):
        """
        Overriding this method will allow us to always have a default value.
        """
        value = super(TradeIdeaListFilter, self).value()
        if value is None:
            if self.default_value is None:
                # If there is at least one Species, return the first by name. Otherwise, None.
                first_species = TradeIdea.objects.order_by('trade_subject').first()
                value = None 
                self.default_value = value
            else:
                value = self.default_value
        return str(value)
# class TradeIdeaListFilter(admin.SimpleListFilter):
#     """
#     This filter will always return a subset of the instances in a Model, either filtering by the
#     user choice or by a default value.
#     """
#     # Human-readable title which will be displayed in the
#     # right admin sidebar just above the filter options.
#     title = 'trade_status_flag'

#     # Parameter for the filter that will be used in the URL query.
#     parameter_name = 'trade_status_flag'

#     default_value = None

#     def lookups(self, request, model_admin):
#         """
#         Returns a list of tuples. The first element in each
#         tuple is the coded value for the option that will
#         appear in the URL query. The second element is the
#         human-readable name for the option that will appear
#         in the right sidebar.
#         """
#         return [
#         ('success', 'success'),
#         ('waiting', 'waiting')
#         ]

#         # list_of_species = []
#         # queryset = TradeIdea.objects.all()
#         # for species in queryset:
#         # 	# list_of_species[str(species.trade_status_flag)] = species.trade_status_flag
#         #     list_of_species.append(
#         #         (str(species.trade_status_flag), species.id)
#         #     )
#         # print("list_of_species", list_of_species)
#         # return sorted(list_of_species, key=lambda tp: tp[1])

#     def queryset(self, request, queryset):
#         print("self value", self.value())
#         """
#         Returns the filtered queryset based on the value
#         provided in the query string and retrievable via
#         `self.value()`.
#         """
#         # Compare the requested value to decide how to filter the queryset.
#         if self.value():
#             return queryset.filter(trade_status_flag=self.value())
#         return queryset

#     def value(self):
#         """
#         Overriding this method will allow us to always have a default value.
#         """
#         value = super(TradeIdeaListFilter, self).value()
#         print("value", value)
#         if value is None:
#             if self.default_value is None:
#                 # If there is at least one Species, return the first by name. Otherwise, None.
#                 first_species = TradeIdea.objects.order_by('trade_status_flag').first()
#                 print("first_species", first_species)
#                 value = None if first_species is None else first_species.trade_status_flag
#                 self.default_value = value
#             else:
#                 value = self.default_value
#         return str(value)

