package  com.example.backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Tickets;


public interface TicketsRepo extends JpaRepository<Tickets, Long> {
    
}
