package com.codestates.seb43_main_012.qna;

import org.springframework.stereotype.Component;

@Component
public class QnAMapper {
    public QnADto.Response qnaToQnAResponseDto(QnA qna)
    {
        QnADto.Response response = new QnADto.Response(
                qna.getQnaId(),
                qna.getQuestion(),
                qna.getAnswer(),
                qna.isBookmarkStatus()
        );

        return response;
    }
}
