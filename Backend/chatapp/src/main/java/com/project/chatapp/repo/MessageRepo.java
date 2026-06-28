package com.project.chatapp.repo;

import com.project.chatapp.entity.Message;
import com.project.chatapp.enums.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
        ORDER BY m.timeStamp ASC
        """)
    List<Message> findChatHistory(@Param("user1") Long user1,
                                  @Param("user2") Long user2);


    @Query("""
    SELECT m
    FROM Message m
    WHERE
        (m.senderId = :user1 AND m.receiverId = :user2)
        OR
        (m.senderId = :user2 AND m.receiverId = :user1)
    ORDER BY m.timeStamp DESC
    """)
    List<Message> findConversations(
            @Param("user1") Long user1,
            @Param("user2") Long user2
    );

    @Transactional
    @Modifying
    @Query("""
    UPDATE Message m
    SET m.status = :status
    WHERE m.id = :messageId
    """)
    void updateMessageStatus(
            @Param("messageId") Long messageId,
            @Param("status") MessageStatus status
            );


    @Query("""
    SELECT COUNT(m)
    FROM Message m
    WHERE
    m.senderId = :senderId
    AND
    m.receiverId = :receiverId
    AND
    m.status <> com.project.chatapp.enums.MessageStatus.READ
    """)
    Long countUnreadMessage(
            @Param("senderId") Long senderId,
            @Param("receiverId") Long receiverId
    );


    List<Message> findBySenderIdAndReceiverIdAndStatus(
            Long senderId,
            Long receiverId,
            MessageStatus status
    );

    List<Message> findByReceiverIdAndStatus(
            Long receiverId,
            MessageStatus status
    );


}
