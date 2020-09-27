package x99.dev.assignment.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import x99.dev.assignment.exceptions.CustomDefinedException;
import x99.dev.assignment.models.Item;
import x99.dev.assignment.models.TotalPrice;
import x99.dev.assignment.repository.ItemRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ItemService implements IntItemService{
    @Autowired
    ItemRepository repository;

    @Override
    public Double calculateItemPrice(Item item, Integer amount) {
        Double totalPrice = 0.0;
        try {
            Integer cartoonAmount = amount / item.getNoOfUnitsInCartoon();
            System.out.println("cartoonAmount : "+cartoonAmount);
            Integer remainingAmount = amount % item.getNoOfUnitsInCartoon();
            System.out.println("remainingAmount : "+remainingAmount);
            Double cartoonPrice = cartoonAmount * item.getPriceOFSingleCartoon();
            System.out.println("cartoonPrice : "+cartoonPrice);
            Double singleUnitPrice = remainingAmount * item.calculateSingleUnitPrice();
            System.out.println("singleUnitPrice : "+singleUnitPrice);
            totalPrice = cartoonPrice + singleUnitPrice;
            System.out.println("totalPrice : "+totalPrice);
            if(cartoonAmount >= item.getMinCartoonAmountToDiscount()) {
                Double discountAmount = (item.getPriceOFSingleCartoon() * item.getDiscountPrecentage());
                System.out.println("discountAmount : "+discountAmount);
                totalPrice = totalPrice - discountAmount;
            }
            System.out.println("totalPrice : "+totalPrice);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return totalPrice;
    }

    @Override
    public List<Item> getFirstUnitPriceForFiftyItems(Item entity) {
        List<Item> itemList = new ArrayList<Item>();

        if(entity.getId()!=null)  {

            for (int i = 1; i <= 50; i++){
                Item newEntity = new Item();
                newEntity.setId(entity.getId());
                newEntity.setImageUrl(entity.getImageUrl());
                newEntity.setNoOfUnitsInCartoon(entity.getNoOfUnitsInCartoon());
                newEntity.setDiscountPrecentage(entity.getDiscountPrecentage());
                newEntity.setIncreasedPrecentage(entity.getIncreasedPrecentage());
                newEntity.setMinCartoonAmountToDiscount(entity.getMinCartoonAmountToDiscount());
                newEntity.setNoOfUnitsInCartoon(entity.getNoOfUnitsInCartoon());
                newEntity.setPriceOFSingleCartoon(this.calculateItemPrice(entity,i));
                newEntity.setItemName(entity.getItemName());
                itemList.add(newEntity);
            }

        }

        if(itemList.size() > 0) {
            return itemList;
        } else {
            return new ArrayList<Item>();
        }
    }

    @Override
    public Double calculateTotalPrice(List<TotalPrice> list) {
        Double totalPrice = 0.0;
        for(TotalPrice purchasedItem: list) {
            totalPrice = totalPrice + this.calculateItemPrice(purchasedItem.getItem(), purchasedItem.getPurchasedAmount());
        }
        return totalPrice;
    }

    @Override
    public Item getItemById(Long id) throws CustomDefinedException {
        Optional<Item> item = repository.findById(id);
        if(item.isPresent()) {
            return item.get();
        } else {
            throw new CustomDefinedException("No item record exist for given id",id);
        }
    }

    @Override
    public List<Item> getAllItems() {
        List<Item> itemList = repository.findAll();
        if(itemList.size() > 0) {
            return itemList;
        } else {
            return new ArrayList<Item>();
        }
    }

    @Override
    public Item createOrUpdateItem(Item entity) throws CustomDefinedException {
        if(entity.getId()!=null)  {
            Optional<Item> item = repository.findById(entity.getId());
            if(item.isPresent()) {
                Item newEntity = item.get();
                newEntity.setImageUrl(entity.getImageUrl());
                newEntity.setDiscountPrecentage(entity.getDiscountPrecentage());
                newEntity.setIncreasedPrecentage(entity.getIncreasedPrecentage());
                newEntity.setMinCartoonAmountToDiscount(entity.getMinCartoonAmountToDiscount());
                newEntity.setNoOfUnitsInCartoon(entity.getNoOfUnitsInCartoon());
                newEntity.setPriceOFSingleCartoon(entity.getPriceOFSingleCartoon());
                newEntity.setItemName(entity.getItemName());
                newEntity = repository.save(newEntity);
                return newEntity;
            } else {
                entity = repository.save(entity);
                return entity;
            }
        } else {
            entity = repository.save(entity);
            return entity;
        }
    }

    @Override
    public void deleteItemById(Long id) throws CustomDefinedException {
        Optional<Item> item = repository.findById(id);

        if(item.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new CustomDefinedException("No item exist for given id",id);
        }
    }
}
