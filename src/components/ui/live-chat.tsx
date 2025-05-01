"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, MessageSquare, Send, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"online" | "offline" | "typing">("online");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isNewMessageNotification, setIsNewMessageNotification] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Otomatik cevap için
  useEffect(() => {
    if (isOpen && messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setStatus("typing");

      const typingTimeout = setTimeout(() => {
        const responses = [
          "Merhaba! Size nasıl yardımcı olabilirim?",
          "MacroSnip ekibinden Ahmet. Sorunuzu yanıtlamaktan memnuniyet duyarım.",
          "Makrolarımız hakkında daha fazla bilgi mi almak istiyorsunuz?",
          "Valorant makrolarımız hakkında detaylı bilgi için makro sayfamızı ziyaret edebilirsiniz.",
          "Teknik destek talebiniz için teşekkürler. Ekibimiz en kısa sürede size dönüş yapacaktır."
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            text: randomResponse,
            timestamp: new Date().toISOString(),
            sender: "agent"
          }
        ]);

        setStatus("online");
      }, 2000);

      return () => clearTimeout(typingTimeout);
    }
  }, [messages, isOpen]);

  // Otomatik kaydırma
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Eğer sohbet kapalıysa ve yeni mesaj geldiyse bildirim göster
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].sender === "agent") {
      setIsNewMessageNotification(true);
      setUnreadMessages(prev => prev + 1);
    }
  }, [messages, isOpen]);

  // Sohbet açılınca bildirimi ve okunmamış mesaj sayısını sıfırla
  useEffect(() => {
    if (isOpen) {
      setIsNewMessageNotification(false);
      setUnreadMessages(0);
    }
  }, [isOpen]);

  // Sayfa yüklendiğinde otomatik karşılama mesajı
  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      if (messages.length === 0) {
        setMessages([
          {
            id: "welcome",
            text: "Merhaba! MacroSnip canlı desteğe hoş geldiniz. Size nasıl yardımcı olabiliriz?",
            timestamp: new Date().toISOString(),
            sender: "agent"
          }
        ]);

        setIsNewMessageNotification(true);
        setUnreadMessages(1);
      }
    }, 3000);

    return () => clearTimeout(welcomeTimeout);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: message,
        timestamp: new Date().toISOString(),
        sender: "user"
      }
    ]);

    setMessage("");
  };

  return (
    <>
      {/* Sohbet Balonu Butonu */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-14 h-14 rounded-full valorant-button shadow-lg",
              isOpen ? "bg-macrosnip-darker" : "red-gradient"
            )}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageSquare className="h-6 w-6" />
            )}
          </Button>

          {/* Bildirim işareti */}
          <AnimatePresence>
            {!isOpen && isNewMessageNotification && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              >
                {unreadMessages}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Durum metni */}
          {!isOpen && (
            <div className="absolute -top-10 right-0 bg-macrosnip-dark text-white text-xs py-1 px-2 rounded-md whitespace-nowrap">
              <div className="flex items-center space-x-1">
                <span className={cn(
                  "inline-block w-2 h-2 rounded-full",
                  status === "online" ? "bg-green-500" :
                  status === "typing" ? "bg-yellow-500" : "bg-gray-500"
                )}></span>
                <span>7/24 Canlı Destek</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Sohbet Penceresi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 w-80 sm:w-96 bg-macrosnip-dark border border-macrosnip-gray shadow-xl rounded-lg overflow-hidden z-40 flex flex-col"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "500px" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Başlık */}
            <div className="p-4 border-b border-macrosnip-gray bg-macrosnip-darker flex justify-between items-center">
              <div>
                <h3 className="font-bold">MacroSnip Canlı Destek</h3>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <span className={cn(
                    "inline-block w-2 h-2 rounded-full mr-1",
                    status === "online" ? "bg-green-500" :
                    status === "typing" ? "bg-yellow-500" : "bg-gray-500"
                  )}></span>
                  <span>
                    {status === "online" ? "Çevrimiçi" :
                     status === "typing" ? "Yazıyor..." : "Çevrimdışı"}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-macrosnip-gray"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Mesajlar */}
            <div className="flex-grow p-4 overflow-y-auto bg-[#1a1a20]">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <MessageSquare className="h-12 w-12 mb-4 text-macrosnip-light-gray" />
                  <p className="text-sm">Merhaba! MacroSnip destek ekibine hoş geldiniz.
                  Size nasıl yardımcı olabiliriz?</p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "mb-4 max-w-[80%]",
                        msg.sender === "user" ? "ml-auto" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "rounded-lg p-3 inline-block",
                        msg.sender === "user"
                          ? "bg-macrosnip-red text-white rounded-br-none"
                          : "bg-macrosnip-darker text-white rounded-bl-none"
                      )}>
                        {msg.text}
                      </div>
                      <div className={cn(
                        "text-xs text-gray-400 mt-1 flex items-center",
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      )}>
                        {msg.sender === "agent" && (
                          <div className="flex items-center mr-2">
                            <div className="w-4 h-4 rounded-full bg-macrosnip-red flex items-center justify-center mr-1">
                              <User className="h-2 w-2 text-white" />
                            </div>
                            <span>Destek</span>
                          </div>
                        )}
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}

              {status === "typing" && (
                <div className="flex items-center mb-4 max-w-[80%]">
                  <div className="bg-macrosnip-darker text-white rounded-lg rounded-bl-none p-3 inline-block">
                    <div className="flex space-x-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>•</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-macrosnip-gray bg-macrosnip-darker">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Mesajınızı yazın..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow bg-macrosnip-dark border-macrosnip-gray"
                />
                <Button
                  type="submit"
                  className="red-gradient ml-2"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  sender: "user" | "agent";
}
