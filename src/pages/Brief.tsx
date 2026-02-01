import { TopNav } from "@/components/TopNav";
import FreeChatBrief from "@/components/FreeChatBrief";
import { MessageSquare, CheckCircle, Zap } from "lucide-react";

export default function Brief() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <TopNav />

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl mb-4 sm:mb-6">
            <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            ספר לי על העסק שלך
          </h1>
          <p className="text-lg sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
            פשוט כתוב בצורה חופשית - <span className="font-bold text-purple-600">הAI שלנו יבין הכל!</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-3 text-gray-500 text-sm sm:text-base">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
              ללא טפסים
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              שיחה טבעית
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-600" />
              תוצאות מיידיות
            </span>
          </div>
        </div>

        {/* Free Chat Brief */}
        <FreeChatBrief />
      </main>
    </div>
  );
}
