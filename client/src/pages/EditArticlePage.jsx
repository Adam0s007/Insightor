import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, fetchArticle, updateArticle } from "../utils/http";
import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "../components/Articles/ArticleForm/ArticleForm";
import LoadingOverlay from "../ui/LoadingOverlay/LoadingOverlay";
import MessageModal from "../ui/MessageModal/MessageModal";
import styles from "../components/Articles/ArticleForm/ArticleForm.module.css";

const EditArticlePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" or "error"
  const [message, setMessage] = useState('');

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["article", params.articleId],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.articleId }),
  });

  const { mutate } = useMutation({
    mutationFn: updateArticle,
    onMutate: async (data) => {
      const newArticle = data.article;
      await queryClient.cancelQueries({ queryKey: ["articles", params.articleId] });
      const previousArticle = queryClient.getQueryData(["articles", params.articleId]);
      queryClient.setQueryData(["articles", params.articleId], newArticle);
      return { previousArticle };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["articles", params.articleId], context.previousArticle);
      setMessage("An error occurred! Try again later.");
      setModalType("error");
      setShowModal(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["articles", params.articleId]);
    },
    onSuccess: () => {
      // setMessage('Article updated successfully!');
      // setModalType("success");
      // setShowModal(true);
      navigate('..',{
        state: { message: 'Article updated successfully!', type: 'success' }
      });
    }
  });

  function handleSubmit(article) {
    mutate({ id: params.articleId, article });
  }

  const closeModal = () => {
    setShowModal(false);
  };
  
  let content = null;
  if (data) {
    content = <ArticleForm data={data} onSubmit={handleSubmit} type="edit" />;
  } else if (isPending) {
    content = <LoadingOverlay />;
  } else if (isError) {
    content = `Error: ${error.message}`;
  }

  return (
    <div className={styles.container}>
       {showModal && <MessageModal type={modalType} message={message} onClose={closeModal} />}
      {content}
    </div>
  );
};

export default EditArticlePage;
