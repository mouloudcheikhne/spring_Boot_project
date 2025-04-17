package com.example.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.jwtModule.repositories.UserRepository;
import com.example.backend.models.Reclamation;
import com.example.backend.models.ServiceModel;
import com.example.backend.repositories.ReclamationRepo;
import com.example.backend.repositories.ServiceRepositorie;
import com.example.backend.services.Myservice;

@RestController
public class mycontrollers {

    @Autowired
    private Myservice myservice;

    @Autowired
    private ServiceRepositorie myrepo;
    @Autowired
    private UserRepository userrepo;

    @Autowired
    private ReclamationRepo reclaRepo;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/service")
    public List<ServiceModel> getALLServices() {
        return myservice.getAll();
    }

    @PostMapping("/admin/add/service")
    public ServiceModel addService(@RequestBody ServiceModel newService) {

        return myservice.addService(newService);
    }

    @GetMapping("/admin/delete/service/{id}")
    public String getMethodName(@PathVariable Long id) {
        return myservice.deleteService(id);
    }

    @PostMapping("/admin/updateservice/{id}")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody ServiceModel Ser) {

        Optional<ServiceModel> optionalservice = myrepo.findById(id);
        if (optionalservice.isPresent()) {
            ServiceModel s = optionalservice.get();
            if (Ser.getNom() != null) {
                s.setNom(Ser.getNom());
                // description
            }
            if (Ser.getDescription() != null) {
                s.setDescription(Ser.getDescription());
                // description
            }
            myrepo.save(s);
            return ResponseEntity.ok("service est modifie");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("service pas mewjoude");

    }

    @PostMapping("/user/recalamtion/{id}")
    public String reclamation(@PathVariable Long id, @RequestBody Reclamation recl) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<AppUser> opuser = userrepo.findByEmail(email);
        if (opuser.isPresent()) {
            Optional<ServiceModel> optionservice = myrepo.findById(id);
            if (optionservice.isPresent()) {
                ServiceModel serviceM = optionservice.get();

                AppUser user = opuser.get();
                Long id_user = user.getId();
                String description = recl.getDescription();
                // description service
                Reclamation reclamation = Reclamation.builder()
                        .description(recl.getDescription())
                        .user(user)
                        .service(serviceM)
                        .build();
                reclaRepo.save(reclamation);
                return "reclamtion est enregestre";
            }

        }
        return "recalamtion pas enrengestre";
    }

    @GetMapping("/admin/recalmations")
    public List<Reclamation> getallrecalmation() {
        return myservice.getallreclamation();
    }
    @PostMapping("/admin/updatereclamtion/{id}")
    public String postMethodName(@PathVariable Long id,@RequestBody Reclamation entity) {
        
        
        return myservice.updateReclamtion(id,entity);
    }
    @GetMapping("/admin/deleterecalmtion/{id}")
    public String deltereclamtion(@PathVariable Long id) {
        return myservice.deltereclamtion(id);
    }
    @GetMapping("/admin/changereclamtion/{id}")
    public String changeEtatReclamtion(@PathVariable Long id) {
        return myservice.changeEtatRecla(id);
    }
    
    

}
