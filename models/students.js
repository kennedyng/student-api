// models/students.js - Student data and operations with caching
let students = [
  { id: 2420983, name: 'Mike Muyambango', email: 'mike-muyambango@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Group 22', github: 'https://github.com/organizations/Software-Foundation-group-22/settings/profile' },
  { id: 2420971, name: 'Israel Mumba', email: 'israel-mumba@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Group 22', github: 'https://github.com/organizations/Software-Foundation-group-22/settings/profile' },
  { id: 2410264, name: 'Robert Sichizya', email: 'robert-sichizya@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Group 22', github: 'https://github.com/organizations/Software-Foundation-group-22/settings/profile' },
  { id: 2421003, name: 'Bristol Shalowa', email: 'bristol-shalowa@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Group 22', github: 'https://github.com/organizations/Software-Foundation-group-22/settings/profile' },
  { id: 2410014, name: 'Tehilla Chiwama', email: 'tehilla-chiwama@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Vibe Coders 101', github: 'https://github.com/VibeCoders101' },
  { id: 2410032, name: 'Cheela Mulilo', email: 'cheela-mulilo@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Vibe Coders 101', github: 'https://github.com/VibeCoders101' },
  { id: 2410013, name: 'Mwenya Simpungwe', email: 'mwenya-simpungwe@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Vibe Coders 101', github: 'https://github.com/VibeCoders101' },
  { id: 2410010, name: 'Bright Mwansa', email: 'bright-mwansa@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Vibe Coders 101', github: 'https://github.com/VibeCoders101' },
  { id: 2410123, name: 'Joshua Mazaza', email: 'joshua-mazaza@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'CodeCraftersHQ2025', github: 'https://github.com/CodeCraftersHQ2025' },
  { id: 2410605, name: 'Mulenga Mulenga', email: 'mulenga-mulenga@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'CodeCraftersHQ2025', github: 'https://github.com/CodeCraftersHQ2025' },
  { id: 2410432, name: 'Katendi Kamenga', email: 'katendi-kamenga@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'CodeCraftersHQ2025', github: 'https://github.com/CodeCraftersHQ2025' },
  { id: 2410362, name: 'Francis Njobvu', email: 'francis-njobvu@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'CodeCraftersHQ2025', github: 'https://github.com/CodeCraftersHQ2025' },
  { id: 2410587, name: 'Mubiana Silishebo', email: 'mubiana-silishebo@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'CodeCraftersHQ2025', github: 'https://github.com/CodeCraftersHQ2025' },
  { id: 2420931, name: 'Mercyton Sinkala', email: 'mercyton-sinkala@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Blueland Technology', github: 'https://github.com/Blueland-Technology' },
  { id: 2410050, name: 'Fortune Jere', email: 'fortune-jere@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Blueland Technology', github: 'https://github.com/Blueland-Technology' },
  { id: 2420949, name: 'John Bwalya Mumba', email: 'john-bwalya-mumba@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Blueland Technology', github: 'https://github.com/Blueland-Technology' },
  { id: 2420926, name: 'Prince Kanyembo', email: 'prince-kanyembo@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Blueland Technology', github: 'https://github.com/Blueland-Technology' },
  { id: 2420995, name: 'Thomas Phiri', email: 'thomas-phiri@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Blueland Technology', github: 'https://github.com/Blueland-Technology' },
  { id: 2430961, name: 'Amos Kabashi', email: 'amos-kabashi@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Tech-Foward', github: 'https://github.com/Tech-Foward' },
  { id: 2420992, name: 'Madalitso Sange Banda', email: 'madalitso-sange-banda@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Tech-Foward', github: 'https://github.com/Tech-Foward' },
  { id: 2421035, name: 'Blessings Syansowa', email: 'blessings-syansowa@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Tech-Foward', github: 'https://github.com/Tech-Foward' },
  { id: 2301154, name: 'Lusayo Mbale', email: 'lusayo-mbale@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Tech-Foward', github: 'https://github.com/Tech-Foward' },
  { id: 2300898, name: 'Sheperd Sinkala', email: 'sheperd-sinkala@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Tech-Foward', github: 'https://github.com/Tech-Foward' },
  { id: 2300803, name: 'Teddy Kashinda', email: 'teddy-kashinda@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Teddy Kashinda', github: 'https://github.com/TeddyKashinda/teddykashinda.git' },
  { id: 2300876, name: 'Mathews Goma', email: 'mathews-goma@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Teddy Kashinda', github: 'https://github.com/TeddyKashinda/teddykashinda.git' },
  { id: 2300726, name: 'Lawrence Chavunga', email: 'lawrence-chavunga@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Teddy Kashinda', github: 'https://github.com/TeddyKashinda/teddykashinda.git' },
  { id: 2420986, name: 'Tatenda Mungandaire', email: 'tatenda-mungandaire@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NextDevCollective', github: 'https://github.com/orgs/NextDevCollective/people' },
  { id: 2420974, name: 'Tafadzwa Mungandaire', email: 'tafadzwa-mungandaire@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NextDevCollective', github: 'https://github.com/orgs/NextDevCollective/people' },
  { id: 2421009, name: 'Balica Mukange', email: 'balica-mukange@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NextDevCollective', github: 'https://github.com/orgs/NextDevCollective/people' },
  { id: 2420990, name: 'Limpo Musonda', email: 'limpo-musonda@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NextDevCollective', github: 'https://github.com/orgs/NextDevCollective/people' },
  { id: 2420988, name: 'Albert Kunda', email: 'albert-kunda@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NextDevCollective', github: 'https://github.com/orgs/NextDevCollective/people' },
  { id: 2420928, name: 'Emmanuel Mwamba', email: 'emmanuel-mwamba@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NovaStack Lab', github: 'https://github.com/NovaStack-Labs' },
  { id: 2420934, name: 'Elijah Nonde', email: 'elijah-non-de@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NovaStack Lab', github: 'https://github.com/NovaStack-Labs' },
  { id: 2300797, name: 'Leonard Nyirenda', email: 'leonard-nyirenda@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NovaStack Lab', github: 'https://github.com/NovaStack-Labs' },
  { id: 2410434, name: 'Frank Mwelwa', email: 'frank-mwelwa@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'NovaStack Lab', github: 'https://github.com/NovaStack-Labs' },
  { id: 2410157, name: 'Nachula Nachamba', email: 'nachula-nachamba@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Kappy-Ltd', github: 'https://github.com/kappy-Ltd' },
  { id: 2410181, name: 'Majata Hichimi', email: 'majata-hichimi@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Kappy-Ltd', github: 'https://github.com/kappy-Ltd' },
  { id: 2410396, name: 'Taizya Nakapende', email: 'taizya-nakapende@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Kappy-Ltd', github: 'https://github.com/kappy-Ltd' },
  { id: 2410052, name: 'Davies Mubambe', email: 'davies-mubambe@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Kappy-Ltd', github: 'https://github.com/kappy-Ltd' },
  { id: 2410559, name: 'Ndame Sepete', email: 'ndame-sepete@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'AFK Engineers', github: 'https://github.com/AFK-Engineers' },
  { id: 2410234, name: 'Gabriel Mwila', email: 'gabriel-mwila@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'AFK Engineers', github: 'https://github.com/AFK-Engineers' },
  { id: 2410009, name: 'Martin Muloshi', email: 'martin-muloshi@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'AFK Engineers', github: 'https://github.com/AFK-Engineers' },
  { id: 2410103, name: 'Moses Phiri', email: 'moses-phiri@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'AFK Engineers', github: 'https://github.com/AFK-Engineers' },
  { id: 2410030, name: 'Alintula Silwimba', email: 'alintula-silwimba@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'AFK Engineers', github: 'https://github.com/AFK-Engineers' },
  { id: 2410182, name: 'Piaget Chishala', email: 'piaget-chishala@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'AFK Engineers', github: 'https://github.com/AFK-Engineers' },
  { id: 2420908, name: 'Robert Muntanga', email: 'robert-muntanga@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Softbase-lab', github: 'https://github.com/softbase-labs' },
  { id: 2420907, name: 'Wongani Miyanza', email: 'wongani-miyanza@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Softbase-lab', github: 'https://github.com/softbase-labs' },
  { id: 2410170, name: 'Ernest Chiwala', email: 'ernest-chiwala@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'The Code Crafters', github: 'https://github.com/BSE2210-The-Code-Crafters' },
  { id: 2410039, name: 'Mwape Bwalya', email: 'mwape-bwalya@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'The Code Crafters', github: 'https://github.com/BSE2210-The-Code-Crafters' },
  { id: 2410237, name: 'Prince Zulu', email: 'prince-zulu@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'The Code Crafters', github: 'https://github.com/BSE2210-The-Code-Crafters' },
  { id: 2410395, name: 'Kondwani Mwelwa', email: 'kondwani-mwelwa@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'The Code Crafters', github: 'https://github.com/BSE2210-The-Code-Crafters' },
  { id: 2410401, name: 'Richard Phiri', email: 'richard-phiri@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'The Code Crafters', github: 'https://github.com/BSE2210-The-Code-Crafters' },
  { id: 2410348, name: 'David Chisenga', email: 'david-chisenga@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'FORGE2.0', github: 'https://github.com/FORGE2-0' },
  { id: 2410008, name: 'Martha Chooka', email: 'martha-chooka@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'FORGE2.0', github: 'https://github.com/FORGE2-0' },
  { id: 2410093, name: 'Davies Manchishi', email: 'davies-manchishi@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'FORGE2.0', github: 'https://github.com/FORGE2-0' },
  { id: 2410109, name: 'Innocent Kabwe', email: 'innocent-kabwe@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'LOGIC TECH', github: 'https://github.com/ZUT-TEAM' },
  { id: 2300294, name: 'Kelvin Mumba', email: 'kelvin-mumba@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'LOGIC TECH', github: 'https://github.com/ZUT-TEAM' },
  { id: 2410291, name: 'Sibongile Tembo', email: 'sibongile-tembo@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'LOGIC TECH', github: 'https://github.com/ZUT-TEAM' },
  { id: 2410683, name: 'Katola Sinkala', email: 'katola-sinkala@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'LOGIC TECH', github: 'https://github.com/ZUT-TEAM' },
  { id: 2410051, name: 'Robby Chungo', email: 'robby-chungo@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Quantum Stack 13', github: '' },
  { id: 2410053, name: 'John Mwando', email: 'john-mwando@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Quantum Stack 13', github: '' },
  { id: 2410073, name: 'Valarie Kasongo', email: 'valarie-kasongo@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Quantum Stack 13', github: '' },
  { id: 2410226, name: 'Chandi Chileshe', email: 'chandi-chileshe@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Quantum Stack 13', github: '' },
  { id: 2410092, name: 'Benny Simpamba', email: 'benny-simpamba@school.edu', role: 'student', enrolled_at: '2025-01-01', active: true, team: 'Quantum Stack 13', github: '' }
];

// Caching for performance
let cachedStats = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000; // 30 seconds cache

// Helper function to find student index by ID
const findIdx = id => students.findIndex(s => s.id === Number(id));

// Clear cache when data changes
const clearCache = () => {
  cachedStats = null;
  cacheTimestamp = 0;
};

// Export functions and data
module.exports = {
  students,
  findIdx,
  // Get all students
  getAllStudents: () => students,
  // Get student by ID
  getStudentById: (id) => {
    const idx = findIdx(id);
    return idx !== -1 ? students[idx] : null;
  },
  // Add a new student
  addStudent: (student) => {
    students.push(student);
    clearCache(); // Clear cache when data changes
    return student;
  },
  // Update student
  updateStudent: (id, updates) => {
    const idx = findIdx(id);
    if (idx !== -1) {
      Object.assign(students[idx], updates);
      clearCache(); // Clear cache when data changes
      return students[idx];
    }
    return null;
  },
  // Delete student
  deleteStudent: (id) => {
    const idx = findIdx(id);
    if (idx !== -1) {
      students.splice(idx, 1);
      clearCache(); // Clear cache when data changes
      return true;
    }
    return false;
  },
  // Search students by name (with basic caching for frequent searches)
  searchStudents: (query) => {
    // Simple length-based caching to avoid expensive operations
    if (query.length < 2) return []; // Require minimum 2 characters
    return students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  },
  // Get paginated students
  getPaginatedStudents: (page = 1, size = 10) => {
    // Validate inputs to prevent abuse
    const validPage = Math.max(1, parseInt(page) || 1);
    const validSize = Math.min(100, Math.max(1, parseInt(size) || 10)); // Max 100 items per page

    const startIndex = (validPage - 1) * validSize;
    const endIndex = startIndex + validSize;

    return {
      page: validPage,
      size: validSize,
      data: students.slice(startIndex, endIndex),
      total: students.length
    };
  },
  // Get cached statistics for health checks
  getStats: () => {
    const now = Date.now();

    // Return cached stats if still valid
    if (cachedStats && (now - cacheTimestamp) < CACHE_DURATION) {
      return cachedStats;
    }

    // Calculate and cache new stats
    cachedStats = {
      total: students.length,
      active: students.filter(s => s.active).length,
      teams: [...new Set(students.map(s => s.team))].length,
      timestamp: new Date().toISOString()
    };

    cacheTimestamp = now;
    return cachedStats;
  }
};
