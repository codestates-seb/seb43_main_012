package com.codestates.seb43_main_012.qna;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QnAService {

    private final QnARepository qnaRepository;

    public QnAService(QnARepository qnaRepository)
    {
        this.qnaRepository = qnaRepository;
    }


    public QnA saveQnA(QnA qna)
    {
        return qnaRepository.save(qna);
    }
    public List<Map<String, String>> buildMessage(long conversationId)
    {
        List<QnA> qnaList = findQnAs(conversationId);

        List<Map<String, String >> messages = new ArrayList<>();
        qnaList.stream().forEach((qna)->
                {
                    Map<String, String> userMessage = new HashMap<>();
                    userMessage.put("role","user");
                    userMessage.put("content", qna.getQuestion());
                    messages.add(userMessage);
                    Map<String, String> assistantMessage = new HashMap<>();
                    assistantMessage.put("role","assistant");
                    assistantMessage.put("content", qna.getAnswer());
                    messages.add(assistantMessage);
                }
        );

        return messages;
    }

    public List<QnA> findQnAs(long conversationId)
    {
        List<QnA> QnAs = qnaRepository.findAllByConversationId(conversationId);
        return QnAs;
    }
}
