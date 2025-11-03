/**
 * ページ内の指定された要素にスムーズスクロールする
 * ヘッダーの高さを自動的に考慮する
 */
export const scrollToSection = (
    sectionId: string,
    options: {
      offset?: number;
      waitForImages?: boolean;
      onStart?: () => void;
      onComplete?: () => void;
    } = {}
  ) => {
    const { offset = 20, waitForImages = false, onStart, onComplete } = options;
  
    const executeScroll = async () => {
      onStart?.();
  
      // 画像読み込みを待つ場合
      if (waitForImages) {
        const images = Array.from(document.querySelectorAll('img'));
        const incompleteImages = images.filter(img => !img.complete);
        
        if (incompleteImages.length > 0) {
          console.log(`⏳ ${incompleteImages.length}枚の画像読み込みを待機中...`);
          
          await Promise.all(
            incompleteImages.map((img) => {
              return new Promise((resolve) => {
                const timer = setTimeout(resolve, 5000);
                img.addEventListener('load', () => {
                  clearTimeout(timer);
                  resolve(null);
                }, { once: true });
                img.addEventListener('error', () => {
                  clearTimeout(timer);
                  resolve(null);
                }, { once: true });
              });
            })
          );
          
          await new Promise(resolve => setTimeout(resolve, 200));
          console.log('✅ 画像読み込み完了');
        }
      }
  
      // セクションを取得(#の有無に対応)
      const cleanId = sectionId.replace('#', ''); // #を削除
      const element = document.getElementById(cleanId);
      
      if (!element) {
        console.error(`❌ セクションが見つかりません: ${cleanId}`);
        console.log('利用可能なID:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
        onComplete?.();
        return;
      }
  
      console.log('✅ セクション発見:', element);
  
      // ヘッダーの高さを取得
      const header = document.querySelector('header');
      const headerHeight = header?.offsetHeight || 81;
  
      // スクロール位置を計算
      const elementPosition = element.getBoundingClientRect().top;
      const targetPosition = elementPosition + window.pageYOffset - headerHeight - offset;
  
      console.log('📍 スクロール実行');
      console.log('  セクション:', cleanId);
      console.log('  ヘッダー高さ:', headerHeight);
      console.log('  現在位置:', window.pageYOffset);
      console.log('  要素の相対位置:', elementPosition);
      console.log('  目標位置:', targetPosition);
  
      // スクロール実行
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
  
      // スクロール完了を監視して位置を再確認
      let scrollCheckCount = 0;
      const maxChecks = 3;
      
      const checkScrollPosition = () => {
        scrollCheckCount++;
        
        const rect = element.getBoundingClientRect();
        const currentDistance = rect.top;
        const expectedDistance = headerHeight + offset;
        const difference = Math.abs(currentDistance - expectedDistance);
  
        console.log(`📏 位置チェック${scrollCheckCount}回目:`, {
          現在: currentDistance.toFixed(2),
          期待: expectedDistance,
          差分: difference.toFixed(2)
        });
  
        // 50px以上ズレていて、まだチェック回数が残っている場合
        if (difference > 50 && scrollCheckCount < maxChecks) {
          console.log('⚠️ 位置を再調整します');
          const adjustPosition = window.pageYOffset + currentDistance - expectedDistance;
          window.scrollTo({
            top: adjustPosition,
            behavior: 'smooth'
          });
          
          setTimeout(checkScrollPosition, 800);
        } else {
          if (difference <= 50) {
            console.log('✅ 正確な位置に到達しました');
          } else {
            console.log('⚠️ 完全には到達できませんでした (差分:', difference.toFixed(2), 'px)');
          }
          onComplete?.();
        }
      };
  
      setTimeout(checkScrollPosition, 800);
    };
  
    executeScroll();
  };