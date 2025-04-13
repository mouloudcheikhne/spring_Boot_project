package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repositories.ServiceRepositorie;
import com.mysql.cj.log.Log;
import com.example.backend.models.ServiceModel;
@Service
public class Myservice {
    @Autowired
    ServiceRepositorie mySerciceRepo;
    

    public List<ServiceModel> getAll() {
        
        return mySerciceRepo.findAll();
    }

    public ServiceModel addService(ServiceModel newService) {
        mySerciceRepo.save(newService);
        return newService;
    }

    public String deleteService(Long id) {
        Optional<ServiceModel> optionalService=mySerciceRepo.findById(id);
        if(optionalService.isPresent()){
            ServiceModel s=optionalService.get();
            mySerciceRepo.delete(s);
            return "service est delete";
        }
        else{
            return "service pas delete";
        }
      
    }
    
}
