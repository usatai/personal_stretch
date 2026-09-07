"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 旧LP（1ページ構成）のアンカーリンクを、対応する新ページへ転送する。
 *
 * URLフラグメント（#price 等）はサーバーに送信されないため
 * next.config.ts の redirects() では処理できない。
 * SNSや外部サイトに貼られた旧リンクを拾うため、クライアント側で振り分ける。
 */
const LEGACY_HASH_MAP: Record<string, string> = {
  "#concerns": "/about",
  "#first-time": "/about",
  "#trainer": "/trainer",
  "#purpose": "/results",
  "#area": "/area",
  "#price": "/price",
  "#contact": "/contact",
};

const LegacyHashRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const target = LEGACY_HASH_MAP[window.location.hash];
    if (target) router.replace(target);
  }, [router]);

  return null;
};

export default LegacyHashRedirect;
