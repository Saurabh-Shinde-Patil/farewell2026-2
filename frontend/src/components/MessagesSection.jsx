import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { commentService } from "@/services/commentService";
import { MessageSquare, Send, Loader2, Sparkles } from "lucide-react";
import canvasConfetti from "canvas-confetti";

const moodEmojis = ["❤️", "🎓", "🎉", "✨", "☕", "😎", "🚀", "🙌", "🥂"];

/**
 * MessagesSection / Guestbook.
 * Hooks into the comment service and fires canvas-confetti.
 */
export default function MessagesSection() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("❤️");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const feed = await commentService.getComments();
        setComments(feed);
      } catch (e) {
        console.error("Failed to load comments", e);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);

    try {
      const newComment = await commentService.addComment(
        text,
        name.trim() || "Anonymous",
        selectedEmoji
      );

      setComments((prev) => [newComment, ...prev]);

      setName("");
      setText("");
      setSelectedEmoji("❤️");

      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#00f0ff", "#bd00ff", "#ff007f"],
      });
    } catch (err) {
      console.error("Failed to add message", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="messages" className="relative py-28 bg-background overflow-hidden">
      <div className="absolute top-1/3 left-10 w-[20vw] h-[20vw] bg-neon-pink/5 rounded-full blur-[80px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/3 right-10 w-[20vw] h-[20vw] bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none animate-float-slow" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-bg border border-card-border shadow-sm text-xs font-semibold text-neon-purple uppercase tracking-wider mb-3"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Digital Guestbook</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight text-foreground"
          >
            Leave a Farewell Message
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Post Message Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6 md:p-8 border border-card-border shadow-xl lg:col-span-2 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan" />

            <h3 className="font-sans font-bold text-xl text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-purple" />
              Write Your Note
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nickname" className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                  Nickname (Optional)
                </label>
                <input
                  id="nickname"
                  type="text"
                  placeholder="e.g. Backbencher / Anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-card-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-neon-purple focus:border-neon-purple transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="messageText" className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                  Farewell Note
                </label>
                <textarea
                  id="messageText"
                  required
                  rows="4"
                  placeholder="Share a memory, joke, or say goodbye..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-card-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-neon-purple focus:border-neon-purple transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                  Set Your Mood Emoji
                </span>
                <div className="flex flex-wrap gap-2">
                  {moodEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-lg border transition-all cursor-pointer ${
                        selectedEmoji === emoji
                          ? "bg-neon-purple/10 border-neon-purple scale-110 shadow-sm"
                          : "border-card-border bg-background/50 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan text-white hover:brightness-105 active:scale-[0.98] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(189,0,255,0.2)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Posting..." : "Post Message"}
              </button>
            </form>
          </motion.div>

          {/* Comments Feed */}
          <div className="lg:col-span-3 space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-card-border">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-neon-purple" />
                <span className="text-xs text-foreground/50">Loading notes...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-card-border rounded-3xl bg-neutral-50/20 dark:bg-neutral-950/10">
                <MessageSquare className="w-8 h-8 mx-auto text-foreground/30 mb-3" />
                <p className="text-sm text-foreground/50">No notes written yet. Be the first to leave one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence initial={false}>
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="glass border border-card-border p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative group"
                    >
                      <span className="absolute top-4 right-4 text-xl select-none" role="img" aria-label="mood">
                        {comment.emoji}
                      </span>

                      <div>
                        <div className="flex flex-col mb-3">
                          <span className="font-sans font-bold text-sm text-foreground pr-8 break-all">
                            {comment.author}
                          </span>
                          <span className="text-[10px] text-foreground/45 mt-0.5">
                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-wrap break-words">
                          {comment.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
