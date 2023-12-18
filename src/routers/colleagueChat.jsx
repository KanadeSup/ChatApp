import ColleagueChat from '/pages/ColleagueChat'
import ChatSection from '../pages/ColleagueChat/ChatSection'
import HomePage from '../pages/ColleagueChat/HomePage'

export default [
   {
      path: "/:workspaceId?/colleague-chat",
      element: <ColleagueChat />,
      children: [
         {
            index: true,
            element: <HomePage />
         },
         {
            path:":conversationId",
            element: <ChatSection />
         }
      ]
   },
]
