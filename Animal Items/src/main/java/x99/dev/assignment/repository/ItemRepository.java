package x99.dev.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import x99.dev.assignment.models.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
