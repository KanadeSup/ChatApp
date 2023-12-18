import ColleagueChat from '/pages/ColleagueChat'
import ChatSection from '../pages/ColleagueChat/ChatSection'

export default [
   {
      path: "/:workspaceId?/colleague-chat",
      element: <ColleagueChat />,
      children: [
         {
            index: true,
            element: <p>there is no chat here</p>
         },
         {
            path:":conversationId",
            element: <ChatSection />
         }
      ]
   },
]
