package com.codestates.seb43_main_012.qna;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class QnARepositoryImpl extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    public QnARepositoryImpl(JPAQueryFactory jpaQueryFactory)
    {
        super(QnA.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<QnA> findByKeyword(String keyword)
    {
        QQnA qna = QQnA.qnA;
        Predicate predicate = qna.question.contains(keyword)
                .or(qna.answer.contains(keyword))
                .or(qna.conversation.title.contains(keyword));

        return jpaQueryFactory
                .selectFrom(qna)
                .where(predicate)
                .fetch();
    }

}
