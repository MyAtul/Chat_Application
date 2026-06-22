package com.project.chatapp.repo;

import com.project.chatapp.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message,Long> {

    List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);


    @Query("""
        SELECT m
        FROM Message m
        WHERE
        (m.senderId = :user1 AND m.receiverId = :user2)
        OR
        (m.senderId = :user2 AND m.receiverId = :user1)
        ORDER BY m.timestamp ASC
        """)
    List<Message> findChatHistory(@Param("user1") Long user1,
                                  @Param("user2") Long user2);
}
