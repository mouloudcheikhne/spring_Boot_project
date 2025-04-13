package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.ServiceModel;
import com.example.backend.services.Myservice;




@RestController
public class mycontrollers {
    @Autowired
    private Myservice myservice;
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
    
    
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    @GetMapping("/admin/home")
    public String getadmin() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

}
