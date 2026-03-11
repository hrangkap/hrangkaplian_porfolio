"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";
const CDN_BASE = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist";

const accentMap: Record<string, { primary: string; dark: string; light: string }> = {
  blue:    { primary: "#2563eb", dark: "#1d4ed8", light: "#3b82f6" },
  violet:  { primary: "#7c3aed", dark: "#6d28d9", light: "#8b5cf6" },
  emerald: { primary: "#059669", dark: "#047857", light: "#10b981" },
  rose:    { primary: "#e11d48", dark: "#be123c", light: "#f43f5e" },
  amber:   { primary: "#d97706", dark: "#b45309", light: "#f59e0b" },
  cyan:    { primary: "#0891b2", dark: "#0e7490", light: "#06b6d4" },
};

export default function ChatWidget() {
  const initialized = useRef(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const { theme } = useTheme();

  // Initialize chat widget once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load CSS from jsDelivr
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${CDN_BASE}/style.css`;
    document.head.appendChild(link);

    // Create persistent style element for theme overrides (append AFTER the CSS link)
    const style = document.createElement("style");
    style.id = "n8n-chat-theme";
    document.head.appendChild(style);
    styleRef.current = style;

    // Load the ES module bundle
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { createChat } from '${CDN_BASE}/chat.bundle.es.js';
      createChat({
        webhookUrl: '${WEBHOOK_URL}',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: 'en',
        initialMessages: [
          "Hi there! I'm Lian's AI assistant. Ask me anything about his skills, experience, research, or projects!"
        ],
        i18n: {
          en: {
            title: "Chat with Lian's AI",
            subtitle: "Ask me anything about Lian",
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your message...',
          },
        },
      });
    `;
    document.body.appendChild(script);
  }, []);

  // Update chat theme colors dynamically by overriding n8n CSS variables
  useEffect(() => {
    if (!styleRef.current) return;

    const colors = accentMap[theme.accent] || accentMap.blue;
    const isDark = theme.mode === "dark" || theme.mode === "dim";

    const bg = theme.mode === "dark" ? "#0a0a0a" : theme.mode === "dim" ? "#1e1e36" : "#ffffff";
    const headerBg = theme.mode === "dark" ? "#111111" : theme.mode === "dim" ? "#22223a" : "#f8f8f8";
    const bodyBg = theme.mode === "dark" ? "#0d0d0d" : theme.mode === "dim" ? "#1a1a2e" : "#f5f5f5";
    const textColor = isDark ? "#e8e8e8" : "#1a1a1a";
    const textMuted = isDark ? "#9ca3af" : "#6b7280";
    const inputBg = isDark ? "#1a1a1a" : "#ffffff";
    const borderColor = isDark ? "#2a2a2a" : "#e5e7eb";
    const messageBotBg = isDark ? "#161616" : "#ffffff";

    styleRef.current.textContent = `
      /* Override n8n CSS variables for theming */
      :root {
        --chat--color--primary: ${colors.primary} !important;
        --chat--color--primary-shade-50: ${colors.dark} !important;
        --chat--color--primary--shade-100: ${colors.dark} !important;
        --chat--color--secondary: ${colors.primary} !important;
        --chat--color-secondary-shade-50: ${colors.dark} !important;
        --chat--color-white: #ffffff !important;
        --chat--color-light: ${bodyBg} !important;
        --chat--color-light-shade-50: ${borderColor} !important;
        --chat--color-light-shade-100: ${borderColor} !important;
        --chat--color-medium: ${borderColor} !important;
        --chat--color-dark: ${textColor} !important;
        --chat--color-typing: ${textMuted} !important;
        --chat--header--background: ${headerBg} !important;
        --chat--header--color: ${textColor} !important;
        --chat--body--background: ${bodyBg} !important;
        --chat--message--bot--background: ${messageBotBg} !important;
        --chat--message--bot--color: ${textColor} !important;
        --chat--message--bot--border: 1px solid ${borderColor} !important;
        --chat--message--user--background: ${colors.primary} !important;
        --chat--message--user--color: #ffffff !important;
        --chat--message--user--border: none !important;
        --chat--message--pre--background: ${isDark ? "#0a0a0a" : "#f0f0f0"} !important;
        --chat--toggle--background: ${colors.primary} !important;
        --chat--toggle--hover--background: ${colors.dark} !important;
        --chat--toggle--active--background: ${colors.dark} !important;
        --chat--toggle--color: #ffffff !important;
        --chat--input--background: ${inputBg} !important;
        --chat--input--text-color: ${textColor} !important;
        --chat--input--container--background: ${inputBg} !important;
        --chat--input--send--button--background: ${colors.primary} !important;
        --chat--input--send--button--color: #ffffff !important;
        --chat--input--send--button--background-hover: ${colors.dark} !important;
        --chat--input--send--button--color-hover: #ffffff !important;
        --chat--button--color--primary: #ffffff !important;
        --chat--button--background--primary: ${colors.primary} !important;
        --chat--button--background--primary--hover: ${colors.dark} !important;
        --chat--footer--background: ${bg} !important;
        --chat--footer--color: ${textMuted} !important;
        --chat--window--border: 1px solid ${borderColor} !important;
        --chat--close--button--color-hover: ${colors.primary} !important;
        --chat--message--actions--color: ${colors.primary} !important;
      }

      /* Additional styling for modern look */
      .n8n-chat .chat-toggle {
        box-shadow: 0 4px 20px ${colors.primary}40, 0 2px 8px rgba(0,0,0,0.2) !important;
        width: 56px !important;
        height: 56px !important;
        border-radius: 50% !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      .n8n-chat .chat-toggle:hover {
        transform: scale(1.08) !important;
        box-shadow: 0 6px 28px ${colors.primary}50, 0 4px 12px rgba(0,0,0,0.3) !important;
      }

      .n8n-chat .chat-window {
        border-radius: 16px !important;
        overflow: hidden !important;
        box-shadow: 0 20px 60px rgba(0,0,0,${isDark ? "0.5" : "0.15"}), 0 0 40px ${colors.primary}10 !important;
        font-family: var(--active-font, system-ui, sans-serif) !important;
      }

      .n8n-chat .chat-header {
        border-bottom: 1px solid ${borderColor} !important;
        padding: 16px 20px !important;
      }
      .n8n-chat .chat-header h1 {
        font-size: 1.1rem !important;
        font-weight: 700 !important;
      }
      .n8n-chat .chat-header p {
        font-size: 0.8rem !important;
        opacity: 0.7 !important;
      }

      .n8n-chat .chat-message-bot .chat-message-markdown {
        border-radius: 12px 12px 12px 4px !important;
        font-size: 0.9rem !important;
        line-height: 1.6 !important;
      }

      .n8n-chat .chat-message-user .chat-message-markdown {
        border-radius: 12px 12px 4px 12px !important;
        font-size: 0.9rem !important;
        line-height: 1.6 !important;
      }

      .n8n-chat .chat-inputs {
        border: 1px solid ${borderColor} !important;
        border-radius: 12px !important;
        margin: 12px !important;
        padding: 4px 4px 4px 12px !important;
        transition: border-color 0.2s, box-shadow 0.2s !important;
      }
      .n8n-chat .chat-inputs:focus-within {
        border-color: ${colors.primary} !important;
        box-shadow: 0 0 0 3px ${colors.primary}20 !important;
      }

      .n8n-chat .chat-input-send-button {
        border-radius: 10px !important;
        width: 36px !important;
        height: 36px !important;
        transition: all 0.2s !important;
      }
      .n8n-chat .chat-input-send-button:hover:not([disabled]) {
        transform: scale(1.05) !important;
      }

      .n8n-chat .chat-layout {
        font-family: var(--active-font, system-ui, sans-serif) !important;
      }
      .n8n-chat .chat-message-markdown,
      .n8n-chat .chat-message-markdown * {
        font-family: inherit !important;
      }
    `;
  }, [theme]);

  return null;
}
