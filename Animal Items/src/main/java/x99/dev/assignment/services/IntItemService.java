package x99.dev.assignment.services;

import x99.dev.assignment.exceptions.CustomDefinedException;
import x99.dev.assignment.models.Item;
import java.util.List;

public interface IntItemService extends PriceCalculations{
    List<Item> getAllItems();
    List<Item> getFirstUnitPriceForFiftyItems(Item entity);
    Item getItemById(Long id) throws CustomDefinedException;
    void deleteItemById(Long id) throws CustomDefinedException;
    Item createOrUpdateItem(Item entity) throws CustomDefinedException;
}
