import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  console.log("context api: ", feedbackEdit.item);
  console.log(feedback);

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    // API 통해서 값을 받아온 후 -> 배열에 넣는다.
    setFeedback(data);
    // 값 받아오면, 로딩은 멈춰준다.
    setIsLoading(false);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("wanna delete?")) {
      // 컴펌하면, 데이터에서 지워버리는 request를 보낸다.
      await fetch(`/feedback/${id}`, { method: "DELETE" });

      // 데이터에서 지운 후, UI에 뿌려준다.
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    // post하면 -> DB에 새로운 값이 저장됨.
    const response = await fetch(`/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //들어온 newFeedback을 DB에 값을 넣는다.
      body: JSON.stringify(newFeedback),
    });

    // 데이터에 입력 됐으면, 데이터를 파싱해준다.
    // ????????????????????굳이 필요한가??????
    // 왜 바로 newFeedback을 넣으면 안되나? 똑같은거 아닌가?
    const data = await response.json();

    // 파싱해준 데이터를 UI에 뿌려준다.
    // ?????????????????????????????????
    // setFeedback([feedback, data]);
    setFeedback([data, ...feedback]);
  };

  // Update feedback item

  const updateFeedback = async (id, updItem) => {
    // 해당 ID만 DB에 update 작업.
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    // 왜 굳이 파싱하나??????
    // <??????????????????? />
    // DB 업데이트 후, data 파싱한다.
    const data = await response.json();

    // 업데이트 후 UI에 뿌려준다.
    // for loop
    // 해당 아이디 찾아서 -> updItem 바꿔준다.
    // 해당 아이디가 아닌건 그대로 놔둔다.

    // NOTE: no need to spread data and item
    // 그냥 바로 교체 해주면 된다.
    setFeedback(feedback.map((item) => (item.id === id ? data : item)));

    // FIX: this fixes being able to add a feedback after editing
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

// react로부터 createContext를 import 한다.
// createContext를 default로 export 한다. (집 주인)
// App js에서 모두 적용할 수 있게 대장을 만들어준다. -> Provider
// Provider를 export한다.
// Provider는 children을 받는다.
// children은 부모로부터 옴.

// the Provider gives access to the context to its children
// children에게, 컨텐스트를 쓸 수 있게 권한을 준다.
// return <FeedbackContext.Provider>{children}</FeedbackContext.Provider>;
