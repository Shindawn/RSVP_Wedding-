export type EntourageGroup = {
  title: string;
  names?: string[];
  columns?: [string[], string[]];
  subgroups?: Array<{ title: string; names: string[] }>;
  mobileOrder?: number;
};

export const entourageGroups: EntourageGroup[] = [
  { title: 'Officiating Priest', names: ['Most Rev. Jose R. Rojas, Jr., D.D.'], mobileOrder: 1 },
  { title: 'Parents of the Groom', names: ['Mr. Charles M. Caadlawon', 'Engr. Precita G. Caadlawon'], mobileOrder: 2 },
  { title: 'Parents of the Bride', names: ['PLTCOL Francisco R Rojas (Ret)', 'Ms. Regina T. Rojas'], mobileOrder: 2 },
  { title: 'Principal Sponsors', columns: [
    ['Hon. Eric T. Rodriguez', 'Hon. Eddie D. Vitalicio', 'Mr. Arcangel T. Rodriguez', 'Mr. Sulastiano -- Evangelista', 'Mr. Henry B. Tipay', 'Mr. Mario -- Diaz', 'Mr. Charles Andrew -- Hoar'],
    ['Dr. Susan C. Collano', 'Dr. Edna T. Villamor', 'Engr. Rosana T. Camacho', 'Engr. Roselle C. Turreda', 'Ms. Maria Teresa P. Tipay', 'Ms. Helen V. Diaz', 'Ms. Romina C. Hoar'],
  ], mobileOrder: 3 },
  { title: 'Bestman', names: ['Atty. Aaron Chrysler G. Caadlawon'], mobileOrder: 4 },
  { title: 'Maid of Honor', names: ['Atty. Mary France S. Soquerata'], mobileOrder: 5 },
  { title: 'Matron of Honor', names: ['Ms. Ghenna R. Salamat'], mobileOrder: 6 },
  { title: 'Groomsmen', names: ['Engr. Romeo S. Coronejo', 'Mr. Franklin S. Oclarino', 'Atty. Michael Angelo V. Marquez', 'Hon. Emil Kurt C. Villaforta', 'Mr. Lorenz Kurt C. Abrazaldo'], mobileOrder: 7 },
  { title: 'Bridesmaids', names: ['Ms. Christine Joy T. Camacho', 'Atty. Judea Lynn Q. Ballesteros', 'Atty. Michelli B. Samonte', 'Atty. Jan Elna A. Natividad-Casipong', 'Ms. Denn Reed -- Magbanua'], mobileOrder: 8 },
  { title: 'Candle', names: ['Mr. Frank Scott T. Rojas', 'Dr. Mary Grace B. Rojas'], mobileOrder: 9 },
  { title: 'Veil', names: ['Engr. Chris Angelo G. Caadlawon', 'Ms. Irish M. Caadlawon'], mobileOrder: 10 },
  { title: 'Cord', names: ['Mr. Mark Lester V. Urbano', 'Ms. Chelou Mae B. Bautista'], mobileOrder: 11 },
  { title: 'Rosary', names: ['Mr. Jedy C. Orcales', 'Ms. Jessabel M. Coronejo'], mobileOrder: 12 },
  { title: 'Ring Bearer', names: ['Kaden B. Rojas'], mobileOrder: 13 },
  { title: 'Coin Bearer', names: ['Cassius T. Caadlawon'], mobileOrder: 14 },
  { title: 'Bible Bearer', names: ['Lucas M. Caadlawon'], mobileOrder: 15 },
  { title: 'Crucifix Bearer', names: ['Ethan C. Arcilla'], mobileOrder: 16 },
  { title: 'Flower Ladies', names: ['Engr. Shane T. Magtagnob', 'Ms. Maria Azucena P. Evangelista', 'Ms. Jemarie - Darisan', 'Ms. Janine - Villacorta'], mobileOrder: 17 },
  { title: 'Flower Girls', names: ['Yzabella R. Salamat', 'Kiara B. Rojas', 'Diane Faye S. Tipay', 'Faith -- Tebelin', 'Hope -- Tebelin'], mobileOrder: 18 },
  { title: 'Offertory', subgroups: [
    { title: 'Bread', names: ['Mr. Manuel N. Tipay, Sr.', 'Ms. Daisy B. Tipay'] },
    { title: 'Egg', names: ['Mr. Remagen -- Nieves', 'Ms. Dannica Rose T. Nieves'] },
    { title: 'Flowers', names: ['Ms. Glazhelle D. Aguiler', 'Mr. Kobe -- C. Arcilla'] },
    { title: 'Fruits', names: ['Ms. Evelyn T. Olitoquit', 'Mr. Kennith Harry P. Tipay'] },
    { title: 'Candle', names: ['Ms. Tiffany C. Bonifacio', 'Ms. Tinegine C. Bonifacio'] },
    { title: 'Wine', names: ['Ms. Hazel -- Soriao', 'Ms. Timmy C. Bonifaco'] },
  ], mobileOrder: 19 },
];
