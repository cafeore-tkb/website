// 団体紹介データ
export interface OrganizationData {
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}

export const organizationData: OrganizationData = {
  description:
    "珈琲・俺は、2000年から続く歴史ある珈琲店です。一杯一杯に込められた想いと、お客様との大切な時間を大切にしています。厳選された豆から淹れる香り高いコーヒーと、温かいおもてなしで、皆様をお迎えしています。",

  features: [
    {
      title: "厳選された豆",
      description:
        "世界中から厳選した高品質なコーヒー豆を使用し、焙煎から抽出まで一貫して手がけています。",
    },
    {
      title: "一杯一杯丁寧に",
      description:
        "お客様一人ひとりに合わせた、丁寧な抽出を心がけています。時間をかけて淹れる本格的なコーヒーをお楽しみください。",
    },
    {
      title: "温かいおもてなし",
      description:
        "コーヒーと共に、心温まる時間をお届けします。地域の皆様に愛される珈琲店を目指しています。",
    },
  ],
};
