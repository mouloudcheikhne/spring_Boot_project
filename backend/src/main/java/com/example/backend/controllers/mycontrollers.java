package com.example.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.models.ServiceModel;
import com.example.backend.repositories.ServiceRepositorie;
import com.example.backend.services.Myservice;

@RestController
public class mycontrollers {

    @Autowired
    private Myservice myservice;

    @Autowired
    private ServiceRepositorie myrepo;

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

    @GetMapping("/admin/home")
    public String getadmin() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

    @PostMapping("/admin/updateservice/{id}")
    public ResponseEntity<?> updateService(@PathVariable Long id,@RequestBody ServiceModel Ser) {

        Optional<ServiceModel> optionalservice = myrepo.findById(id);
        if(optionalservice.isPresent()){
            ServiceModel s=optionalservice.get();
            if(Ser.getNom()!=null){
                s.setNom(Ser.getNom());
                // description
            }
            if(Ser.getDescription()!=null){
                s.setDescription(Ser.getDescription());
                // description
            }
            myrepo.save(s);
            return ResponseEntity.ok("service est modifie");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("service pas mewjoude");

    }

}
