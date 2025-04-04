"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

// Zodiac signs data
const zodiacSigns = [
  {
    name: "Aries",
    sunContent:
      "Aries, your energy is off the charts today! Channel that fire into something productive before you accidentally set your to-do list ablaze. A surprise conversation could lead to an exciting opportunity.",
    moonContent:
      "The moon in Aries has you feeling extra sensitive beneath that tough exterior. It's okay to admit you teared up at that commercial with the puppy—we won't tell anyone.",
  },
  {
    name: "Taurus",
    sunContent:
      "Taurus, your stubborn streak is showing today. Before digging your heels in, ask yourself if that hill of mashed potatoes is really worth dying on. Treat yourself to something nice but skip the impulse shopping.",
    moonContent:
      "Your comfort-seeking radar is on high alert under this moon. That couch imprint with your name on it is calling, but don't get too comfortable—you have places to be!",
  },
  {
    name: "Gemini",
    sunContent:
      "Gemini, your plan to Marie Kondo your life might hit a snag today. When emotions run high, your tidy agenda could resemble a toddler's art project. Embrace the chaos—sometimes the best stories come from a little mess!",
    moonContent:
      "Your mind is racing faster than your mouth can keep up, and that's saying something! Write down those midnight ideas before they vanish like your motivation to finish yesterday's projects.",
  },
  {
    name: "Cancer",
    sunContent:
      "Cancer, your emotional armor is strong today, but don't pinch at everyone who comes close. That person who forgot to text back isn't plotting against you—they're just bad at phones.",
    moonContent:
      "The moon has you in your feelings even more than usual. That's like being the wettest water or the most Cancer Cancer. Channel it into creative outlets instead of passive-aggressive sighing.",
  },
  {
    name: "Leo",
    sunContent:
      "Leo, not everyone can handle your spotlight energy today. Dim the high beams occasionally so others can share their stories too. Your hair looks fantastic, by the way—just like you knew it would.",
    moonContent:
      "Even lions need catnaps. This moon has you craving recognition but also rest. Find balance by accepting compliments graciously while wearing your comfiest pajamas.",
  },
  {
    name: "Virgo",
    sunContent:
      "Virgo, your critical eye is extra sharp today. Before pointing out the typo in your friend's heartfelt message, count to ten. Or better yet, make a spreadsheet about it and keep it to yourself.",
    moonContent:
      "Your inner perfectionist is working overtime under this moon. Remember that 'good enough' is sometimes perfect, especially when it comes to making that bed you're just going to mess up again.",
  },
  {
    name: "Libra",
    sunContent:
      "Libra, your indecision reaches new heights today. Yes, both outfits look amazing on you, and no, the universe won't collapse if you pick the 'wrong' lunch option. Just choose something before dinner time arrives.",
    moonContent:
      "Libra, today's cosmic cocktail suggests a splash of patience with a twist of hope! Work demands might cramp your style, and love life could feel like a soap opera rerun. Wallet's a bit tight, so skip the splurge. Watch for skin drama—maybe it's time to ditch that old lotion! ✨",
  },
  {
    name: "Scorpio",
    sunContent:
      "Scorpio, not everything is a conspiracy against you today. That person who didn't wave back probably just didn't see you—no need to put them on your mental revenge list. Save that intensity for something worthwhile.",
    moonContent:
      "Your emotional depth is reaching Mariana Trench levels under this moon. Instead of stinging others with your tail when feelings arise, try actually talking about them. Revolutionary concept, we know.",
  },
  {
    name: "Sagittarius",
    sunContent:
      "Sagittarius, your foot-in-mouth disease is flaring up today. Consider a five-second delay between thoughts and words. Your honesty is refreshing but maybe not when commenting on your boss's new haircut.",
    moonContent:
      "Your wanderlust is hitting hard under this moon, but your bank account is giving serious side-eye to those flight searches. Find adventure locally before your credit card stages an intervention.",
  },
  {
    name: "Capricorn",
    sunContent:
      "Capricorn, the world won't end if you take a break from climbing that career mountain today. The view's pretty nice from where you are too. Try smiling at a stranger—it's free and won't impact your five-year plan.",
    moonContent:
      "Even the most ambitious goat needs rest. This moon has you questioning your work-life balance, which is a fancy way of saying 'all work and no play.' Schedule relaxation like you schedule meetings—with strict adherence.",
  },
  {
    name: "Aquarius",
    sunContent:
      "Aquarius, your revolutionary ideas are extra sparkly today, but not everyone is ready for your vision of communal living where all shoes are shared. Read the room before proposing your utopian future.",
    moonContent:
      "Your detachment is showing under this moon. Yes, you're an intellectual air sign, but your friends might appreciate some emotional presence when they tell you their dog is sick, not theories about veterinary science.",
  },
  {
    name: "Pisces",
    sunContent:
      "Pisces, reality is calling and would like you to return at least a few of its messages today. Daydreaming is your superpower, but maybe pay attention when crossing streets or operating heavy machinery.",
    moonContent:
      "The moon has your emotions flowing like a watercolor painting in the rain. Beautiful, but messy. Keep tissues handy and boundaries ready—not every feeling needs to be shared or acted upon.",
  },
];

export default function HoroscopeCard() {
  // State for current zodiac sign index and active tab
  const [currentIndex, setCurrentIndex] = useState(0); // Default to Aries
  const [activeTab, setActiveTab] = useState("sun"); // Default to sun tab
  const [isChanging, setIsChanging] = useState(false);

  // Get current zodiac sign
  const currentZodiac = zodiacSigns[currentIndex];

  // Handle tab change (sun or moon)
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // Handle zodiac change
  const handleChange = () => {
    if (isChanging) return;

    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % zodiacSigns.length);
      setIsChanging(false);
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto font-sans">
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        {/* Header with tabs */}
        <div className="h-24 relative flex items-end overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={
                activeTab === "sun"
                  ? "/zodiac-bg-beige.png"
                  : "/zodiac-bg-blue.png"
              }
              alt="Zodiac background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex w-full">
            {/* Sun Tab */}
            <button
              className={`flex-1 flex items-center justify-center pb-2 relative ${
                activeTab === "sun"
                  ? "text-purple-700 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("sun")}
            >
              <span className="text-yellow-400 text-lg mr-2">☀️</span>
              <span>Sun Sign</span>
              {activeTab === "sun" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600"></div>
              )}
            </button>

            {/* Moon Tab */}
            <button
              className={`flex-1 flex items-center justify-center pb-2 relative ${
                activeTab === "moon"
                  ? "text-purple-700 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("moon")}
            >
              <span className="text-yellow-300 text-lg mr-2">🌙</span>
              <span>Moon Sign</span>
              {activeTab === "moon" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4">
          {/* Zodiac info with icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {/* Zodiac icon */}
              <div className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center bg-white overflow-hidden">
                <div className="text-2xl">{currentZodiac.name.charAt(0)}</div>
              </div>

              {/* Zodiac name and switch option */}
              <div className="ml-3">
                <div className="flex items-center">
                  <span
                    className={`${
                      activeTab === "sun"
                        ? "text-yellow-500"
                        : "text-yellow-300"
                    } mr-2 text-lg`}
                  >
                    {activeTab === "sun" ? "☀️" : "🌙"}
                  </span>
                  <span className="text-xl font-medium text-gray-800">
                    {currentZodiac.name}
                  </span>
                </div>
                <button
                  className="text-sm text-purple-500 hover:text-purple-700"
                  onClick={() =>
                    handleTabChange(activeTab === "sun" ? "moon" : "sun")
                  }
                >
                  Switch to {activeTab === "sun" ? "Moon" : "Sun"} Sign
                </button>
              </div>
            </div>

            {/* Change button */}
            <button
              className="flex items-center text-purple-500 hover:text-purple-700"
              onClick={handleChange}
              disabled={isChanging}
            >
              <span className="mr-1">Change</span>
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Horoscope content */}
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">
                {activeTab === "sun" ? "✨" : "🌙"}
              </span>
              <span className="font-medium text-gray-700">
                {activeTab === "sun" ? "Sun Vibes:" : "Moon Vibes:"}
              </span>
            </div>

            <div
              className={`text-gray-600 transition-opacity duration-300 ${
                isChanging ? "opacity-0" : "opacity-100"
              }`}
            >
              {activeTab === "sun"
                ? currentZodiac.sunContent
                : currentZodiac.moonContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
