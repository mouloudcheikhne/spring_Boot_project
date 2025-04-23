package com.example.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.models.DtoTicket_comment;
import com.example.backend.models.DtoTickets;
import com.example.backend.models.Tickets;
import com.example.backend.models.Ticket_comments;
import com.example.backend.repositories.Ticket_commentsRepo;
import com.example.backend.repositories.TicketsRepo;
import com.example.backend.repositories.UsersRepo;

import jakarta.transaction.Transactional;

@Service
public class Myservice {

    @Autowired
    TicketsRepo tickesRepo;
    @Autowired
    UsersRepo usersRepo;
    @Autowired
    private Ticket_commentsRepo ticket_commentsRepo;

    public List<Tickets> getALLticktes() {
        return tickesRepo.findAll();
    }

    public String changeStatus(Long id, Tickets ticket) {
        Optional<Tickets> optionalTickets = tickesRepo.findById(id);
        if (optionalTickets.isPresent()) {
            Tickets ticketa = optionalTickets.get();
            if (ticket.getStatus() != null) {
                ticketa.setStatus(ticket.getStatus());
                tickesRepo.save(ticketa);
                return "status est update";
            }
        }
        return "status pas update";
    }

    public String deleteTickets(Long id) {
        Optional<Tickets> optionalTicktes = tickesRepo.findById(id);
        if (optionalTicktes.isPresent()) {
            Tickets s = optionalTicktes.get();
            tickesRepo.delete(s);
            return "Tickets est delete";
        } else {
            return "Tickets pas delete";
        }

    }

    @Transactional
    public String updateTickets(Long id, DtoTickets tec) {
        Optional<Tickets> optionalTickets = tickesRepo.findById(id);
        System.out.println("Update Ticket id: " + id);

        if (optionalTickets.isPresent()) {
            Tickets ticketa = optionalTickets.get();

            if (tec.getDescription() != null) {
                ticketa.setDescription(tec.getDescription());
            }

            if (tec.getTitle() != null) {
                ticketa.setTitle(tec.getTitle());
            }

            if (tec.getUser_agent() != null) {
                Optional<AppUser> optionalUser = usersRepo.findById(tec.getUser_agent());
                if (optionalUser.isPresent()) {
                    ticketa.setUser_AGENT(optionalUser.get());
                } else {
                    return "user pas trouve";
                }
            }

            // tickesRepo.save(ticketa);
            tickesRepo.save(ticketa);
            return "Ticket update ";

        }

        return "Ticket non trouvé";
    }

    public String deleteticket_comments(Long id) {
        Optional<Ticket_comments> optionalTicket_comments = ticket_commentsRepo.findById(id);
        if (optionalTicket_comments.isPresent()) {
            Ticket_comments s = optionalTicket_comments.get();
            ticket_commentsRepo.delete(s);
            return "Tickets est delete";
        } else {
            return "Tickets pas delete";
        }

    }

    public String ticketCommentsUpdate(Long id, DtoTicket_comment tec) {
        Optional<Ticket_comments> optionalTicket_comments = ticket_commentsRepo.findById(id);
        if (optionalTicket_comments.isPresent()) {
            Ticket_comments s = optionalTicket_comments.get();
            // ticket_id
            if (tec.getMessage() != null) {
                s.setMessage(tec.getMessage());
            }
            if (tec.getTicket_id() != null) {
                Optional<Tickets> optionalTickets = tickesRepo.findById(tec.getTicket_id());
                if (optionalTickets.isPresent()) {
                    s.setTicket_id(tec.getTicket_id());
                }

            }
            ticket_commentsRepo.save(s);
            return "Ticket_comments est upadte";

        }
        return "Ticket_comments pas update";
    }

}
