import { FaInstagram } from "react-icons/fa";

const FooterSection = () => {
    return (
        <footer className="bg-white text-gray-400 py-8 mt-0"> {/* フッターらしい色合いに */}
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2">
                
                {/* SNSリンク */}
                <a
                    href="https://www.instagram.com/reborn_stretch?igsh=MW83cDRncmZpMDMzZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagramでプロフィールを見る"
                    className="hover:text-pink-500 transition-colors duration-200"
                >
                <FaInstagram size={32} />
                </a>
                <span className="font-semibold">Instagram</span> {/* "はこちら" は無くてもOK */}

                {/* コピーライト */}
                <p className="text-sm">
                &copy; {new Date().getFullYear()} Reborn Stretch. All Rights Reserved.
                </p>
                
                {/* プライバシーポリシーなど（将来的に） */}
                {/* <nav>
                <a href="/privacy" className="hover:text-white">プライバシーポリシー</a>
                </nav> */}

            </div>
        </footer>
    )
}

export default FooterSection;