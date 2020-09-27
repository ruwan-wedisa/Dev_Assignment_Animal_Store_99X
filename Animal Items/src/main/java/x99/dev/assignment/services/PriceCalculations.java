package x99.dev.assignment.services;

import x99.dev.assignment.models.Item;
import x99.dev.assignment.models.TotalPrice;
import java.util.List;

public interface PriceCalculations {
    Double calculateItemPrice(Item item, Integer amount);
    Double calculateTotalPrice(List<TotalPrice> list);
}
