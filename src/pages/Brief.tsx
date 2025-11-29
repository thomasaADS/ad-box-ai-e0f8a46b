import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import FreeChatBrief from "@/components/FreeChatBrief";
import { Sparkles, MessageSquare } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";

export default function Brief() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl mb-6 animate-float">
            <MessageSquare className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            💬 ספר לי על העסק שלך
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            פשוט כתוב בצורה חופשית - <span className="font-bold text-purple-600">הAI שלנו יבין הכל!</span>
          </p>
          <p className="text-lg text-gray-500 mt-3">
            ✨ ללא טפסים • 🤖 שיחה טבעית • 🚀 תוצאות מיידיות
          </p>
        </div>

        {/* Free Chat Brief */}
        <FreeChatBrief />
      </main>
      
      <ChatWidget />
    </div>
  );
}
