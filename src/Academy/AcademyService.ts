import {  ModuleLoader, instance as container } from '@tuval/core';

const items = [
    {
        label: 'Bölüm 1: Süreç Yönetimine Giriş',
        icon: '',
        items: [
            {
                label: '1.Süreç Yönetimine Neden İhtiyaç Vardır',
                icon: 'pi pi-fw pi-circle-off',
                videoUrl: './videos/1.mp4',
                /*  command: (event) => {
                     mediaPlayer.Url = './videos/1.mp4';
                 } */
            },
            {
                label: '2. Süreç Nedir? Örnek Bir Süreç: Ürün Sipariş Süreci',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '3. Örnek Bir Süreç: Sipariş Ödeme Süreci',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '4. Örnek Bir Süreç: İç Satın Alım Süreci',
                icon: 'pi pi-fw pi-fw pi-circle-off'
            },
            {
                label: '5. Örnek Bir Süreç: Bir Şikayetin Çözülme Süreci',
                icon: 'pi pi-fw pi-fw pi-circle-off'
            },
            {
                label: '6. Şikayetin Çözülme Süreci ile İlgili Bir Örnek Vaka',
                icon: 'pi pi-fw pi-fw pi-circle-off'
            },
            {
                label: 'İş Süreçlerinin Çıktıları',
                icon: 'pi pi-fw pi-fw pi-circle-off'
            }
        ]
    },
    {
        label: 'Bölüm 2: Bir İş Süreci Nelerden Oluşur',
        items: [
            {
                label: '8. Süreçlerde Olaylar ve Aktiviteler',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '9. Süreçlerdeki Olaylar ve Aktiviteler Üzerine Bir Vaka Çalışması',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '10. Karar Noktaları ve Aktörler',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '11. Karar Noktaları ve Aktörler Üzerine Bir Vaka',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '12. Çıktılar',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '13. Müşteriler',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '14. Aktörler, Müşteriler ve Çıktılar Üzerine Bir Vaka',
                icon: 'pi pi-fw pi-circle-off'
            }
        ]
    },
    {
        label: 'Bölüm 3: İş Süreçleri Yönetiminin Unsurları',
        items: [
            {
                label: '15. İş Süreci ve Süreç Yönetimi',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '16. BPM Stratejileri ve BPM Süreç Döngüsü',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '17. BPM Döngüsündeki Paydaşlar',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '18. Vaka Örneği',
                icon: 'pi pi-fw pi-circle-off',
            }
        ]
    },
    {
        label: 'Bölüm 4: BPMN 2.0 Temelleri',
        items: [
            {
                label: '19. Neden İş Süreçlerini Modellemeliyiz',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '20. BPMN 2.0 ve Ensemble',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '21. BPMN 2.0 Metedolojisinin Tanımlanması',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '22. Süreç Oluşturma',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '23. Olaylar',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '24. Olayların BPMN 2.0 Gösterimi',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '25. Aktiviteler',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '26. Aktivitelerin BPMN 2.0 Gösterimi',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '27. Süreçlerin İsimlendirilmesi',
                icon: 'pi pi-fw pi-circle-off',
            }
        ]
    },
    {
        label: 'Bölüm 5: Kapılar (Akış Kontrolü)',
        items: [
            {
                label: '28. X-OR (Dışlamalı VEYA) Kapısı',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '29. X-OR (Dışlamalı VEYA) Kapısı BPMN 2.0 Gösterimi',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '30. X-OR (Dışlamalı VEYA) / Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '31. VE Kapısı',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '32. VE Kapısı / Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '33. Dışlamalı VEYA ve VE Kapısını İçeren 1.Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '34. Dışlamalı VEYA ve VE Kapısını İçeren 2.Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '35. VEYA Kapısı',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '36. VEYA Kapısı BPMN 2.0 Gösterimi',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '37. Vaka Örneği / Sipariş Verme Süreci',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '38. XOR Kapısı ile Tekrarlama / BPMN 2.0 Gösterimi',
                icon: 'pi pi-fw pi-circle-off',
            },
            {
                label: '39. XOR Kapısı ile Tekrarlama / Başka Bir Vaka (Kredi Sağlayıcısı)',
                icon: 'pi pi-fw pi-circle-off',
            }
        ]
    },
    {
        label: "Bölüm 6: BPMN 2.0'da Veri Perspektifi ve Bilgi Kaynakları",
        items: [
            {
                label: '40. Veri Perspektifi Nedir',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '41. Veri Pespektifi / Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off'
            }
        ]
    },
    {
        label: "Bölüm 7: BPMN 2.0'da Organizasyonel Perspektif / Kulvarlar",
        items: [
            {
                label: '42. Kaynak Perspektifi Nedir',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '43. Kaynak Perspektifi / Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '44. Kaynak Perspektifi / Mesaj Akışları',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '45. Kaynak Perspektifi / Mesaj Akışları / Örnek Vakaa',
                icon: 'pi pi-fw pi-circle-off'
            }
        ]
    },
    {
        label: "Bölüm 8: BPMN 2.0 ile Gelişmiş Süreç Modelleme",
        items: [
            {
                label: '46. Alt Süreçler',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '47. Alt Süreçler / Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '48. Alt Süreçler / Tekrarlayan Aktiviteler ile ilgili Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '49. Aktivitelerin Birçok Kez Yerine Getirilmesi',
                icon: 'pi pi-fw pi-circle-off'
            },
            {
                label: '50. Plansız Alt Süreçler / Tekrarlayan Aktiviteler / Örnek Vaka',
                icon: 'pi pi-fw pi-circle-off'
            }
        ]
    }
];
export class PMAcademyService {
    public static Start() {
        container.register('IEducation', {
            useValue: {
                name: 'Process Mining',
                teacher:'Selim TAN',
                description:'Process Mining',
                icon: 'data:image/jpg;base64,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',
                data: items
            }
        });
    }
}