package  com.example.backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.ServiceModel;

public interface ServiceRepositorie extends JpaRepository<ServiceModel, Long> {
    
}
