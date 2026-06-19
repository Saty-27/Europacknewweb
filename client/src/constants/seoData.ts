export interface SeoLocation {
  name: string;
  type: 'Mumbai Western' | 'Mumbai Central' | 'Navi Mumbai' | 'Industrial Area' | 'Port/Cargo' | 'Metro' | 'Harbour' | 'Vadodara Industrial' | 'Vadodara Commercial';
  nearbyAreas: string[];
}

export interface SeoProduct {
  id: string;
  name: string;
  coreKeyword: string;
  features: string[];
  industries: string[];
  useCases: string[];
}

export const seoProducts: SeoProduct[] = [
  {
    id: 'wooden-pallets',
    name: 'Wooden Pallets',
    coreKeyword: 'wooden pallet',
    features: ['ISPM-15 Certified', 'Heavy-duty load capacity', 'Export compliant', 'Fumigated & Heat Treated'],
    industries: ['Pharmaceuticals', 'FMCG', 'Automobile', 'Heavy Engineering', 'Logistics'],
    useCases: ['Warehouse storage', 'Export sea freight', 'Container stuffing', 'Heavy machinery support']
  },
  {
    id: 'seaworthy-packing',
    name: 'Seaworthy Packing',
    coreKeyword: 'seaworthy packing',
    features: ['Moisture barrier protection', 'Vacuum sealing', 'Anti-corrosion VCI treatment', 'Lashing & choking'],
    industries: ['Heavy Machinery', 'Oil & Gas', 'Marine Equipment', 'Transformers'],
    useCases: ['Break bulk cargo', 'Flat rack container shipping', 'Long sea voyages', 'ODC cargo export']
  },
  {
    id: 'wooden-boxes',
    name: 'Wooden Boxes',
    coreKeyword: 'wooden box',
    features: ['Custom structural design', 'Shock absorption', 'Stackable design', 'Plywood and Pinewood options'],
    industries: ['Electronics', 'Medical Equipment', 'Automobile Components', 'Defense'],
    useCases: ['Fragile equipment transport', 'Export crating', 'Consolidated cargo', 'Air freight']
  },
  {
    id: 'shrink-wrapping',
    name: 'Shrink Wrapping',
    coreKeyword: 'shrink wrapping',
    features: ['Dust & moisture resistance', 'Tamper evident', 'UV protection', 'Tightly secures pallet loads'],
    industries: ['FMCG', 'Textiles', 'Food Processing', 'E-commerce'],
    useCases: ['Warehouse storage', 'Domestic transport', 'Pallet stabilization', 'Retail distribution']
  },
  {
    id: 'corrugated-boxes',
    name: 'Corrugated Boxes',
    coreKeyword: 'corrugated box',
    features: ['High bursting strength', '3-ply to 7-ply options', 'Lightweight', 'Recyclable'],
    industries: ['E-commerce', 'Pharmaceuticals', 'FMCG', 'Consumer Appliances'],
    useCases: ['Retail packaging', 'Air cargo', 'Bulk unitization', 'Domestic courier']
  }
];

export const searchIntents = [
  'Manufacturer',
  'Supplier',
  'Dealer',
  'Export Packaging',
  'Industrial Packaging',
  'Near Me',
  'For Heavy Machinery',
  'For Warehouse',
  'For Export Cargo',
  'Price Guide',
  'Wholesale Supplier',
  'For Pharma Industry',
  'For Sea Shipment'
];

export const seoLocations: SeoLocation[] = [
  // Major Hubs & Industrial Areas
  { name: 'Mumbai', type: 'Mumbai Western', nearbyAreas: ['Thane', 'Navi Mumbai', 'Bhiwandi', 'Vasai'] },
  { name: 'Andheri', type: 'Mumbai Western', nearbyAreas: ['Marol', 'Saki Naka', 'SEEPZ', 'Chakala', 'Vile Parle'] },
  { name: 'Bhiwandi', type: 'Industrial Area', nearbyAreas: ['Kalyan', 'Thane', 'Mankoli', 'Padgha', 'Godown Zone'] },
  { name: 'Navi Mumbai', type: 'Navi Mumbai', nearbyAreas: ['Vashi', 'Turbhe', 'Mahape', 'TTC Industrial Area', 'JNPT'] },
  { name: 'JNPT', type: 'Port/Cargo', nearbyAreas: ['Nhava Sheva', 'Uran', 'Panvel', 'Navi Mumbai'] },
  { name: 'Mumbai Port', type: 'Port/Cargo', nearbyAreas: ['Mazagaon', 'Wadala', 'Colaba', 'CSMT'] },
  { name: 'Sahar Cargo', type: 'Port/Cargo', nearbyAreas: ['Andheri East', 'Vile Parle', 'Airport Road', 'Marol'] },
  { name: 'Vasai', type: 'Industrial Area', nearbyAreas: ['Vasai East', 'Naigaon', 'Virar', 'Pelhar', 'Nallasopara'] },
  { name: 'Thane', type: 'Mumbai Central', nearbyAreas: ['Wagle Estate', 'Mulund', 'Kalwa', 'Bhiwandi', 'Majiwada'] },
  { name: 'Turbhe MIDC', type: 'Industrial Area', nearbyAreas: ['Vashi', 'Sanpada', 'Mahape', 'Pawne'] },
  { name: 'Rabale MIDC', type: 'Industrial Area', nearbyAreas: ['Ghansoli', 'Mahape', 'Airoli', 'Koparkhairane'] },
  { name: 'Boisar', type: 'Industrial Area', nearbyAreas: ['Tarapur MIDC', 'Palghar', 'Vangaon', 'Dahanu'] },
  
  // Western Line
  { name: 'Vile Parle', type: 'Mumbai Western', nearbyAreas: ['Andheri', 'Santacruz', 'Sahar Cargo', 'Domestic Airport'] },
  { name: 'Goregaon', type: 'Mumbai Western', nearbyAreas: ['Malad', 'Jogeshwari', 'Dindoshi', 'Aarey'] },
  { name: 'Malad', type: 'Mumbai Western', nearbyAreas: ['Kandivali', 'Goregaon', 'Mindspace', 'Orlem'] },
  { name: 'Borivali', type: 'Mumbai Western', nearbyAreas: ['Kandivali', 'Dahisar', 'Magathane'] },
  { name: 'Lower Parel', type: 'Mumbai Western', nearbyAreas: ['Worli', 'Mahalaxmi', 'Dadar', 'Prabhadevi'] },
  
  // Central / Harbour Line
  { name: 'Kurla', type: 'Mumbai Central', nearbyAreas: ['Vidyavihar', 'Sion', 'BKC', 'Chunabhatti'] },
  { name: 'Ghatkopar', type: 'Mumbai Central', nearbyAreas: ['Vikhroli', 'Vidyavihar', 'Asalpha', 'Saki Naka'] },
  { name: 'Vashi', type: 'Navi Mumbai', nearbyAreas: ['Sanpada', 'Koparkhairane', 'Turbhe', 'APMC Market'] },
  { name: 'Panvel', type: 'Navi Mumbai', nearbyAreas: ['Khandeshwar', 'Taloja MIDC', 'Kalamboli', 'JNPT'] },

  // Vadodara & Gujarat industrial demand clusters
  { name: 'Vadodara', type: 'Vadodara Industrial', nearbyAreas: ['Makarpura', 'Nandesari GIDC', 'Savli GIDC', 'Ranoli GIDC'] },
  { name: 'Makarpura', type: 'Vadodara Industrial', nearbyAreas: ['GIDC Makarpura', 'Tarsali', 'Manjalpur', 'Vadodara'] },
  { name: 'GIDC Makarpura', type: 'Vadodara Industrial', nearbyAreas: ['Makarpura Industrial Estate', 'Tarsali', 'Manjalpur', 'Vadodara'] },
  { name: 'Makarpura Industrial Estate', type: 'Vadodara Industrial', nearbyAreas: ['GIDC Makarpura', 'Makarpura', 'Tarsali', 'Vadodara'] },
  { name: 'Manjusar', type: 'Vadodara Industrial', nearbyAreas: ['Savli GIDC', 'Savli', 'Vadodara', 'Halol'] },
  { name: 'Savli GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Savli', 'Manjusar', 'Sama-Savli Road', 'Vadodara'] },
  { name: 'Savli', type: 'Vadodara Industrial', nearbyAreas: ['Savli GIDC', 'Manjusar', 'Sama-Savli Road', 'Vadodara'] },
  { name: 'Por GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Por', 'Karjan', 'Vadodara', 'Padra'] },
  { name: 'Por', type: 'Vadodara Industrial', nearbyAreas: ['Por GIDC', 'Karjan', 'Vadodara', 'Padra'] },
  { name: 'Nandesari GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Nandesari', 'Ranoli GIDC', 'Ranoli', 'Vadodara'] },
  { name: 'Nandesari', type: 'Vadodara Industrial', nearbyAreas: ['Nandesari GIDC', 'Ranoli', 'Chhani', 'Vadodara'] },
  { name: 'Ranoli GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Ranoli', 'Nandesari GIDC', 'Chhani', 'Vadodara'] },
  { name: 'Ranoli', type: 'Vadodara Industrial', nearbyAreas: ['Ranoli GIDC', 'Nandesari', 'Chhani', 'Vadodara'] },
  { name: 'Waghodia GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Waghodia', 'Ajwa Road', 'Waghodia Road', 'Vadodara'] },
  { name: 'Waghodia', type: 'Vadodara Industrial', nearbyAreas: ['Waghodia GIDC', 'Ajwa Road', 'Waghodia Road', 'Vadodara'] },
  { name: 'Padra', type: 'Vadodara Industrial', nearbyAreas: ['Padra GIDC', 'Old Padra Road', 'Atladara', 'Vadodara'] },
  { name: 'Padra GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Padra', 'Old Padra Road', 'Atladara', 'Vadodara'] },
  { name: 'Karjan', type: 'Vadodara Industrial', nearbyAreas: ['Karjan GIDC', 'Por GIDC', 'Vadodara', 'Bharuch'] },
  { name: 'Karjan GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Karjan', 'Por GIDC', 'Vadodara', 'Bharuch'] },
  { name: 'Halol', type: 'Vadodara Industrial', nearbyAreas: ['Halol GIDC', 'Kalol', 'Savli', 'Vadodara'] },
  { name: 'Halol GIDC', type: 'Vadodara Industrial', nearbyAreas: ['Halol', 'Kalol', 'Savli GIDC', 'Vadodara'] },
  { name: 'Kalol', type: 'Vadodara Industrial', nearbyAreas: ['Halol', 'Halol GIDC', 'Vadodara', 'Panchmahal'] },
  { name: 'Dabhoi', type: 'Vadodara Industrial', nearbyAreas: ['Waghodia', 'Ajwa Road', 'Vadodara', 'Karjan'] },
  { name: 'Gotri', type: 'Vadodara Commercial', nearbyAreas: ['Vasna Road', 'Subhanpura', 'Akota', 'Vadodara'] },
  { name: 'Alkapuri', type: 'Vadodara Commercial', nearbyAreas: ['Sayajigunj', 'Fatehgunj', 'Akota', 'Vadodara'] },
  { name: 'Akota', type: 'Vadodara Commercial', nearbyAreas: ['Alkapuri', 'Old Padra Road', 'Vasna Road', 'Vadodara'] },
  { name: 'Sayajigunj', type: 'Vadodara Commercial', nearbyAreas: ['Alkapuri', 'Fatehgunj', 'Karelibaug', 'Vadodara'] },
  { name: 'Manjalpur', type: 'Vadodara Commercial', nearbyAreas: ['Tarsali', 'Makarpura', 'Pratapnagar', 'Vadodara'] },
  { name: 'Tarsali', type: 'Vadodara Industrial', nearbyAreas: ['Makarpura', 'Manjalpur', 'GIDC Makarpura', 'Vadodara'] },
  { name: 'Atladara', type: 'Vadodara Commercial', nearbyAreas: ['Padra', 'Old Padra Road', 'Vasna Road', 'Vadodara'] },
  { name: 'Vasna Road', type: 'Vadodara Commercial', nearbyAreas: ['Gotri', 'Akota', 'Old Padra Road', 'Vadodara'] },
  { name: 'Gorwa', type: 'Vadodara Industrial', nearbyAreas: ['Subhanpura', 'Chhani', 'Fatehgunj', 'Vadodara'] },
  { name: 'Subhanpura', type: 'Vadodara Commercial', nearbyAreas: ['Gorwa', 'Gotri', 'Chhani', 'Vadodara'] },
  { name: 'Chhani', type: 'Vadodara Industrial', nearbyAreas: ['Ranoli', 'Nandesari', 'Gorwa', 'Vadodara'] },
  { name: 'Sama-Savli Road', type: 'Vadodara Industrial', nearbyAreas: ['Savli GIDC', 'Vemali', 'Harni', 'Vadodara'] },
  { name: 'Ajwa Road', type: 'Vadodara Industrial', nearbyAreas: ['Waghodia Road', 'Waghodia GIDC', 'Harni', 'Vadodara'] },
  { name: 'Waghodia Road', type: 'Vadodara Industrial', nearbyAreas: ['Waghodia', 'Ajwa Road', 'Karelibaug', 'Vadodara'] },
  { name: 'Harni', type: 'Vadodara Commercial', nearbyAreas: ['New VIP Road', 'Vemali', 'Sama-Savli Road', 'Vadodara'] },
  { name: 'Karelibaug', type: 'Vadodara Commercial', nearbyAreas: ['Fatehgunj', 'Sayajigunj', 'Waghodia Road', 'Vadodara'] },
  { name: 'Fatehgunj', type: 'Vadodara Commercial', nearbyAreas: ['Alkapuri', 'Karelibaug', 'Sayajigunj', 'Vadodara'] },
  { name: 'Pratapnagar', type: 'Vadodara Industrial', nearbyAreas: ['Manjalpur', 'Tarsali', 'Makarpura', 'Vadodara'] },
  { name: 'Bhayli', type: 'Vadodara Commercial', nearbyAreas: ['Sevasi', 'Atladara', 'Old Padra Road', 'Vadodara'] },
  { name: 'Sevasi', type: 'Vadodara Commercial', nearbyAreas: ['Bhayli', 'Gotri', 'Old Padra Road', 'Vadodara'] },
  { name: 'Vemali', type: 'Vadodara Commercial', nearbyAreas: ['Harni', 'Sama-Savli Road', 'New VIP Road', 'Vadodara'] },
  { name: 'New VIP Road', type: 'Vadodara Commercial', nearbyAreas: ['Harni', 'Vemali', 'Karelibaug', 'Vadodara'] },
  { name: 'Old Padra Road', type: 'Vadodara Commercial', nearbyAreas: ['Akota', 'Atladara', 'Bhayli', 'Vadodara'] },
  { name: 'GIDC Industrial Estate Vadodara', type: 'Vadodara Industrial', nearbyAreas: ['Makarpura', 'Nandesari GIDC', 'Ranoli GIDC', 'Savli GIDC'] },
];

// Helper to get a rich localized context paragraph
export const getLocalContext = (loc: SeoLocation) => {
  const zoneLabel = loc.type === 'Industrial Area' || loc.type === 'Vadodara Industrial'
    ? 'industrial belts'
    : 'commercial zones';

  return `Operating near ${loc.name}, businesses across ${loc.nearbyAreas.slice(0, 3).join(', ')}, and surrounding ${zoneLabel} rely on robust packaging solutions to maintain their supply chain integrity.`;
};
