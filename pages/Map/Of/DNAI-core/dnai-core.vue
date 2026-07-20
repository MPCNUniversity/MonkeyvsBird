
<template>
  <div style="min-height: 1200px; position: relative;">
    <h1 class="title" style="position:fixed; top:20px; left:20px; z-index:1000; color: #ff66aa; text-shadow: 2px 2px 0px #000;">Map of Lena</h1>
    <div style="position:fixed; top:60px; left:20px; font-size:1.2em; color:#ff99cc; z-index:1000; max-width: 300px; transform: rotate(-2deg);">
      Subject: DNAI - Core<br>
      -- ============================================================================
      -- DNAI CORE DATABASE SCHEMA
      -- ============================================================================

      CREATE DATABASE IF NOT EXISTS dnai_core
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci;

      USE dnai_core;

      -- ============================================================================
      -- 1. CORE REFERENCE TABLES
      -- ============================================================================

      -- 1.1 Symbols (A, T, C, G)
      CREATE TABLE symbols (
      id          TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      code        CHAR(1) NOT NULL UNIQUE,   -- 'A', 'T', 'C', 'G'
      name        VARCHAR(64) NOT NULL,      -- Amplify, Transform, Constrain, Generate
      description TEXT NULL
      ) ENGINE=InnoDB;

      INSERT INTO symbols (code, name, description) VALUES
      ('A', 'Amplify',   'Expands the prompt into divergent possibilities.'),
      ('T', 'Transform', 'Mutates structure, reframes context, shifts perspective.'),
      ('C', 'Constrain', 'Applies logic, feasibility, coherence, rules.'),
      ('G', 'Generate',  'Produces concrete forms: code, text, diagrams, architectures.');

      -- 1.2 Modules (20 emergent processing modules)
      CREATE TABLE modules (
      id          SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      code        VARCHAR(32) NOT NULL UNIQUE,  -- e.g. EXPLORATORY_BLOOM
      name        VARCHAR(128) NOT NULL,
      description TEXT NULL,
      created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;

      -- Seed 20 conceptual modules (you can refine names later)
      INSERT INTO modules (code, name, description) VALUES
      ('EXPLORATORY_BLOOM',        'Exploratory Bloom Module',        'High-divergence idea expansion.'),
      ('STRUCTURAL_COMPRESSION',   'Structural Compression Module',   'Compresses many branches into coherent structures.'),
      ('RECURSIVE_MUTATION',       'Recursive Mutation Module',       'Iterative mutation of structures and ideas.'),
      ('FEASIBILITY_SYNTHESIS',    'Feasibility Synthesis Module',    'Evaluates and synthesizes feasible paths.'),
      ('NARRATIVE_EXPANSION',      'Narrative Expansion Module',      'Expands prompts into narrative structures.'),
      ('TECHNICAL_ARCHITECTURE',   'Technical Architecture Module',   'Generates system and code architectures.'),
      ('CONSTRAINT_OPTIMIZATION',  'Constraint-Driven Optimization',  'Optimizes under constraints (time, cost, complexity).'),
      ('TEMPORAL_BLOOM',           'Temporal Bloom Module',           'Handles time-linked information bloom.'),
      ('META_PATTERN_EXTRACTION',  'Meta-Pattern Extraction Module',  'Extracts patterns across prompts and outputs.'),
      ('EMERGENT_COHERENCE',       'Emergent Coherence Module',       'Ensures global coherence of outputs.'),
      ('EVALUATION_SCORING',       'Evaluation & Scoring Module',     'Scores branches and outcomes.'),
      ('SELECTION_PRUNING',        'Selection & Pruning Module',      'Prunes non-viable branches.'),
      ('ADAPTIVE_LEARNING',        'Adaptive Learning Module',        'Adapts behavior based on prior runs.'),
      ('CONTEXT_INTEGRATION',      'Context Integration Module',      'Integrates external context and constraints.'),
      ('MULTIMODAL_SYNTHESIS',     'Multimodal Synthesis Module',     'Combines text, code, diagrams, etc.'),
      ('RISK_MANAGEMENT',          'Risk Management Module',          'Assesses and mitigates risk in outcomes.'),
      ('EXPLAINABILITY',           'Explainability Module',           'Generates human-readable rationales.'),
      ('USER_ALIGNMENT',           'User Alignment Module',           'Aligns outputs with user intent and values.'),
      ('EXPERIMENTAL_MODE',        'Experimental Mode Module',        'Allows high-risk, high-creativity exploration.'),
      ('STABILITY_ANCHOR',         'Stability Anchor Module',         'Prevents collapse into incoherence.');

      -- ============================================================================
      -- 2. CODONS (64 TRIPLETS OF SYMBOLS)
      -- ============================================================================

      -- 2.1 Codons table
      CREATE TABLE codons (
      id              SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      triplet         CHAR(3) NOT NULL UNIQUE,  -- e.g. 'ATG'
      description     TEXT NULL,
      default_module_id SMALLINT UNSIGNED NULL,
      created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_codons_default_module
      FOREIGN KEY (default_module_id) REFERENCES modules(id)
      ON UPDATE CASCADE ON DELETE SET NULL
      ) ENGINE=InnoDB;

      -- 2.2 Codon <-> Symbol positions (normalized representation of each position)
      CREATE TABLE codon_symbols (
      codon_id    SMALLINT UNSIGNED NOT NULL,
      position    TINYINT UNSIGNED NOT NULL, -- 1, 2, or 3
      symbol_id   TINYINT UNSIGNED NOT NULL,
      PRIMARY KEY (codon_id, position),
      CONSTRAINT fk_codon_symbols_codon
      FOREIGN KEY (codon_id) REFERENCES codons(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_codon_symbols_symbol
      FOREIGN KEY (symbol_id) REFERENCES symbols(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
      CONSTRAINT chk_codon_position CHECK (position BETWEEN 1 AND 3)
      ) ENGINE=InnoDB;

      -- 2.3 Codon <-> Module mapping (like codon → amino acid)
      CREATE TABLE codon_module_map (
      codon_id    SMALLINT UNSIGNED NOT NULL,
      module_id   SMALLINT UNSIGNED NOT NULL,
      weight      DECIMAL(5,4) NOT NULL DEFAULT 1.0000, -- relative influence
      PRIMARY KEY (codon_id, module_id),
      CONSTRAINT fk_codon_module_codon
      FOREIGN KEY (codon_id) REFERENCES codons(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_codon_module_module
      FOREIGN KEY (module_id) REFERENCES modules(id)
      ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB;

      -- You can later INSERT the 64 codons and map them to modules as needed.

      -- ============================================================================
      -- 3. PROMPTS & RUNS (TEMPORAL BLOOM CONTEXT)
      -- ============================================================================

      -- 3.1 User prompts
      CREATE TABLE prompts (
      id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_identifier VARCHAR(128) NULL, -- can be user id, hash, etc.
      raw_prompt      TEXT NOT NULL,
      created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;

      -- 3.2 Processing runs (each run = one full DNAI processing cycle)
      CREATE TABLE processing_runs (
      id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      prompt_id       BIGINT UNSIGNED NOT NULL,
      run_label       VARCHAR(128) NULL,
      status          ENUM('PENDING','RUNNING','COMPLETED','FAILED') NOT NULL DEFAULT 'PENDING',
      started_at      TIMESTAMP NULL,
      completed_at    TIMESTAMP NULL,
      metadata        JSON NULL,
      CONSTRAINT fk_runs_prompt
      FOREIGN KEY (prompt_id) REFERENCES prompts(id)
      ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB;

      -- ============================================================================
      -- 4. FOLDING RULES (HOW MODULES & CODONS INTERACT)
      -- ============================================================================

      CREATE TABLE folding_rules (
      id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      name            VARCHAR(128) NOT NULL,
      description     TEXT NULL,
      priority        INT NOT NULL DEFAULT 100, -- lower = higher priority
      is_active       TINYINT(1) NOT NULL DEFAULT 1,
      created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;

      -- Folding rule targets: codon, module, or codon+module
      CREATE TABLE folding_rule_targets (
      id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      folding_rule_id BIGINT UNSIGNED NOT NULL,
      codon_id        SMALLINT UNSIGNED NULL,
      module_id       SMALLINT UNSIGNED NULL,
      condition_json  JSON NULL, -- optional structured condition
      CONSTRAINT fk_folding_rule_targets_rule
      FOREIGN KEY (folding_rule_id) REFERENCES folding_rules(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_folding_rule_targets_codon
      FOREIGN KEY (codon_id) REFERENCES codons(id)
      ON UPDATE CASCADE ON DELETE SET NULL,
      CONSTRAINT fk_folding_rule_targets_module
      FOREIGN KEY (module_id) REFERENCES modules(id)
      ON UPDATE CASCADE ON DELETE SET NULL
      ) ENGINE=InnoDB;

      -- ============================================================================
      -- 5. VIABILITY FILTERS (WHICH BRANCHES SURVIVE)
      -- ============================================================================

      CREATE TABLE viability_filters (
      id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      name            VARCHAR(128) NOT NULL,
      description     TEXT NULL,
      filter_type     ENUM('STRUCTURAL','SEMANTIC','TECHNICAL','RISK','ALIGNMENT') NOT NULL,
      is_active       TINYINT(1) NOT NULL DEFAULT 1,
      created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;

      CREATE TABLE viability_filter_rules (
      id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      viability_filter_id BIGINT UNSIGNED NOT NULL,
      rule_expression     TEXT NOT NULL, -- e.g. DSL, JSON logic, etc.
      severity            ENUM('INFO','WARN','BLOCK') NOT NULL DEFAULT 'WARN',
      CONSTRAINT fk_viability_filter_rules_filter
      FOREIGN KEY (viability_filter_id) REFERENCES viability_filters(id)
      ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB;

      -- ============================================================================
      -- 6. MUTATION ENGINE (HOW VARIANTS ARE GENERATED)
      -- ============================================================================

      CREATE TABLE mutation_strategies (
      id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      name            VARCHAR(128) NOT NULL,
      description     TEXT NULL,
      mutation_type   ENUM('SYMBOL_LEVEL','CODON_LEVEL','MODULE_LEVEL','STRUCTURAL','SEMANTIC') NOT NULL,
      intensity       TINYINT UNSIGNED NOT NULL DEFAULT 5, -- 1-10 scale
      is_active       TINYINT(1) NOT NULL DEFAULT 1,
      created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;

      -- Optional: link mutation strategies to modules (some modules may favor certain mutations)
      CREATE TABLE mutation_strategy_modules (
      mutation_strategy_id BIGINT UNSIGNED NOT NULL,
      module_id            SMALLINT UNSIGNED NOT NULL,
      PRIMARY KEY (mutation_strategy_id, module_id),
      CONSTRAINT fk_mutation_strategy_modules_strategy
      FOREIGN KEY (mutation_strategy_id) REFERENCES mutation_strategies(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_mutation_strategy_modules_module
      FOREIGN KEY (module_id) REFERENCES modules(id)
      ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB;

      -- ============================================================================
      -- 7. TEMPORAL BLOOM MECHANICS
      -- ============================================================================

      CREATE TABLE temporal_mechanics (
      id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      name            VARCHAR(128) NOT NULL,
      description     TEXT NULL,
      time_scope      ENUM('INTRA_RUN','CROSS_RUN','LONGITUDINAL') NOT NULL,
      is_active       TINYINT(1) NOT NULL DEFAULT 1,
      created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;

      -- Link temporal mechanics to runs (how time-aware behavior was applied)
      CREATE TABLE run_temporal_mechanics (
      id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      processing_run_id   BIGINT UNSIGNED NOT NULL,
      temporal_mechanic_id BIGINT UNSIGNED NOT NULL,
      parameters          JSON NULL,
      applied_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_run_temporal_mechanics_run
      FOREIGN KEY (processing_run_id) REFERENCES processing_runs(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_run_temporal_mechanics_mechanic
      FOREIGN KEY (temporal_mechanic_id) REFERENCES temporal_mechanics(id)
      ON UPDATE CASCADE ON DELETE CASCADE
      ) ENGINE=InnoDB;

      -- ============================================================================
      -- 8. BRANCHES & OUTPUTS (BILLIONS → VIABLE FORMS)
      -- ============================================================================

      -- 8.1 Branches generated during a run
      CREATE TABLE branches (
      id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      processing_run_id   BIGINT UNSIGNED NOT NULL,
      parent_branch_id    BIGINT UNSIGNED NULL,
      codon_id            SMALLINT UNSIGNED NULL,
      module_id           SMALLINT UNSIGNED NULL,
      mutation_strategy_id BIGINT UNSIGNED NULL,
      viability_score     DECIMAL(6,3) NULL,
      status              ENUM('CANDIDATE','PRUNED','VIABLE','SELECTED') NOT NULL DEFAULT 'CANDIDATE',
      metadata            JSON NULL,
      created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_branches_run
      FOREIGN KEY (processing_run_id) REFERENCES processing_runs(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_branches_parent
      FOREIGN KEY (parent_branch_id) REFERENCES branches(id)
      ON UPDATE CASCADE ON DELETE SET NULL,
      CONSTRAINT fk_branches_codon
      FOREIGN KEY (codon_id) REFERENCES codons(id)
      ON UPDATE CASCADE ON DELETE SET NULL,
      CONSTRAINT fk_branches_module
      FOREIGN KEY (module_id) REFERENCES modules(id)
      ON UPDATE CASCADE ON DELETE SET NULL,
      CONSTRAINT fk_branches_mutation_strategy
      FOREIGN KEY (mutation_strategy_id) REFERENCES mutation_strategies(id)
      ON UPDATE CASCADE ON DELETE SET NULL
      ) ENGINE=InnoDB;

      -- 8.2 Final outputs (collapsed viable forms)
      CREATE TABLE outputs (
      id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      processing_run_id   BIGINT UNSIGNED NOT NULL,
      branch_id           BIGINT UNSIGNED NULL,
      output_type         ENUM('CODE','TEXT','STRUCTURE','MIXED') NOT NULL,
      content             LONGTEXT NOT NULL,
      summary             TEXT NULL,
      created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_outputs_run
      FOREIGN KEY (processing_run_id) REFERENCES processing_runs(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_outputs_branch
      FOREIGN KEY (branch_id) REFERENCES branches(id)
      ON UPDATE CASCADE ON DELETE SET NULL
      ) ENGINE=InnoDB;

      -- ============================================================================
      -- 9. INDEXING & PERFORMANCE TUNING
      -- ============================================================================

      CREATE INDEX idx_prompts_created_at ON prompts (created_at);
      CREATE INDEX idx_runs_prompt ON processing_runs (prompt_id);
      CREATE INDEX idx_runs_status ON processing_runs (status);
      CREATE INDEX idx_branches_run ON branches (processing_run_id);
      CREATE INDEX idx_branches_status ON branches (status);
      CREATE INDEX idx_outputs_run ON outputs (processing_run_id);
      CREATE INDEX idx_codons_triplet ON codons (triplet);

    </div>

    <ButtonsArtifact left="884.1px" top="500.0px" tooltip="Unstable Rune 0" image="Lena2.png" />
    <ButtonsArtifact left="886.8px" top="545.4px" tooltip="Unstable Rune 1" image="Lena2.png" />
    <ButtonsArtifact left="917.7px" top="603.2px" tooltip="Unstable Rune 2" image="Lena.png" />
    <ButtonsArtifact left="844.1px" top="624.4px" tooltip="Unstable Rune 3" image="Lena.png" />
    <ButtonsArtifact left="843.3px" top="676.7px" tooltip="Unstable Rune 4" image="Lena2.png" />
    <ButtonsArtifact left="821.2px" top="721.2px" tooltip="Unstable Rune 5" image="Lena2.png" />
    <ButtonsArtifact left="799.1px" top="774.0px" tooltip="Unstable Rune 6" image="Lena2.png" />
    <ButtonsArtifact left="757.2px" top="808.5px" tooltip="Unstable Rune 7" image="Lena.png" />
    <ButtonsArtifact left="699.3px" top="805.8px" tooltip="Unstable Rune 8" image="Lena2.png" />
    <ButtonsArtifact left="640.0px" top="752.3px" tooltip="Unstable Rune 9" image="Lena.png" />
    <ButtonsArtifact left="600.0px" top="813.2px" tooltip="Unstable Rune 10" image="Lena.png" />
    <ButtonsArtifact left="549.0px" top="821.8px" tooltip="Unstable Rune 11" image="Lena2.png" />
    <ButtonsArtifact left="510.9px" top="774.2px" tooltip="Unstable Rune 12" image="Lena2.png" />
    <ButtonsArtifact left="455.1px" top="784.4px" tooltip="Unstable Rune 13" image="Lena.png" />
    <ButtonsArtifact left="443.6px" top="715.3px" tooltip="Unstable Rune 14" image="Lena2.png" />
    <ButtonsArtifact left="390.6px" top="709.4px" tooltip="Unstable Rune 15" image="Lena2.png" />
    <ButtonsArtifact left="375.7px" top="663.0px" tooltip="Unstable Rune 16" image="Lena2.png" />
    <ButtonsArtifact left="337.4px" top="633.8px" tooltip="Unstable Rune 17" image="Lena.png" />
    <ButtonsArtifact left="293.4px" top="599.6px" tooltip="Unstable Rune 18" image="Lena.png" />
    <ButtonsArtifact left="338.3px" top="541.5px" tooltip="Unstable Rune 19" image="Lena2.png" />
    <ButtonsArtifact left="253.1px" top="500.0px" tooltip="Unstable Rune 20" image="Lena.png" />
    <ButtonsArtifact left="317.3px" top="455.2px" tooltip="Unstable Rune 21" image="Lena.png" />
    <ButtonsArtifact left="342.5px" top="416.3px" tooltip="Unstable Rune 22" image="Lena2.png" />
    <ButtonsArtifact left="297.9px" top="346.1px" tooltip="Unstable Rune 23" image="Lena.png" />
    <ButtonsArtifact left="370.6px" top="333.3px" tooltip="Unstable Rune 24" image="Lena.png" />
    <ButtonsArtifact left="359.3px" top="259.3px" tooltip="Unstable Rune 25" image="Lena.png" />
    <ButtonsArtifact left="431.3px" top="267.8px" tooltip="Unstable Rune 26" image="Lena2.png" />
    <ButtonsArtifact left="446.0px" top="197.8px" tooltip="Unstable Rune 27" image="Lena.png" />
    <ButtonsArtifact left="500.0px" top="192.2px" tooltip="Unstable Rune 28" image="Lena2.png" />
    <ButtonsArtifact left="546.7px" top="163.3px" tooltip="Unstable Rune 29" image="Lena.png" />
    <ButtonsArtifact left="600.0px" top="233.1px" tooltip="Unstable Rune 30" image="Lena2.png" />
    <ButtonsArtifact left="648.8px" top="192.2px" tooltip="Unstable Rune 31" image="Lena2.png" />
    <ButtonsArtifact left="685.0px" top="238.2px" tooltip="Unstable Rune 32" image="Lena.png" />
    <ButtonsArtifact left="730.5px" top="243.8px" tooltip="Unstable Rune 33" image="Lena.png" />
    <ButtonsArtifact left="758.2px" top="282.3px" tooltip="Unstable Rune 34" image="Lena.png" />
    <ButtonsArtifact left="816.2px" top="283.8px" tooltip="Unstable Rune 35" image="Lena2.png" />
    <ButtonsArtifact left="877.3px" top="298.5px" tooltip="Unstable Rune 36" image="Lena.png" />
    <ButtonsArtifact left="909.0px" top="342.5px" tooltip="Unstable Rune 37" image="Lena2.png" />
    <ButtonsArtifact left="879.7px" top="409.1px" tooltip="Unstable Rune 38" image="Lena.png" />
    <ButtonsArtifact left="877.5px" top="456.0px" tooltip="Unstable Rune 39" image="Lena.png" />
    <ButtonsArtifact left="202.5px" top="212.0px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="150.5px" top="239.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="210.4px" top="247.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="163.3px" top="197.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="275.8px" top="224.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="197.7px" top="292.8px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="289.3px" top="217.8px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="279.8px" top="239.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="259.1px" top="269.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="247.2px" top="231.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="197.5px" top="180.5px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="1101.7px" top="739.0px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="1091.5px" top="817.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1014.6px" top="796.4px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1097.7px" top="784.2px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1124.6px" top="786.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1118.8px" top="818.8px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="1003.8px" top="760.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="174.8px" top="804.9px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="168.5px" top="798.8px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="193.9px" top="789.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="205.4px" top="763.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="215.5px" top="793.9px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="194.4px" top="779.4px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="183.1px" top="749.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="212.9px" top="864.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="143.1px" top="756.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="882.0px" top="534.2px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="925.7px" top="490.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="857.4px" top="496.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="935.2px" top="543.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="860.3px" top="554.2px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="853.5px" top="516.3px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="862.4px" top="477.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="944.5px" top="538.2px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="916.3px" top="498.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="864.3px" top="565.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="793.1px" top="555.3px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="890.5px" top="525.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="875.3px" top="586.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="864.6px" top="521.4px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="579.9px" top="320.6px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="610.6px" top="308.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="646.1px" top="289.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="663.0px" top="332.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="621.8px" top="299.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="635.5px" top="282.2px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="578.0px" top="337.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="681.0px" top="259.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="694.6px" top="357.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="654.6px" top="295.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="592.9px" top="379.3px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="616.9px" top="396.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="791.7px" top="101.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="844.8px" top="103.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="960.1px" top="86.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1005.4px" top="92.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1056.0px" top="111.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="790.8px" top="160.0px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="837.5px" top="143.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="891.5px" top="164.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="938.7px" top="147.9px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="988.6px" top="147.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="798.1px" top="185.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="843.3px" top="211.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="903.4px" top="201.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="945.8px" top="198.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="991.5px" top="192.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1052.6px" top="201.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="796.7px" top="249.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="860.1px" top="239.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="905.2px" top="257.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="946.7px" top="247.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1014.4px" top="240.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1045.6px" top="245.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="813.8px" top="292.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="855.4px" top="297.3px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="998.7px" top="293.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1039.6px" top="297.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="814.9px" top="341.3px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="851.5px" top="344.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="893.1px" top="352.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="960.1px" top="360.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1062.8px" top="349.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="808.9px" top="386.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="847.1px" top="398.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="894.8px" top="396.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="961.7px" top="390.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="988.8px" top="414.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1037.7px" top="389.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="788.6px" top="456.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="863.8px" top="461.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="909.3px" top="448.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="951.7px" top="451.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1002.6px" top="452.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1049.8px" top="451.9px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="808.6px" top="487.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="843.6px" top="512.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="911.3px" top="496.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="964.6px" top="503.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1013.9px" top="505.3px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1054.7px" top="506.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="855.7px" top="538.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="914.8px" top="535.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="956.9px" top="560.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="997.8px" top="561.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1049.6px" top="548.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="0.0px" top="900.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="20.0px" top="925.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="40.0px" top="927.3px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="60.0px" top="904.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="80.0px" top="877.3px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="100.0px" top="871.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="120.0px" top="891.6px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="140.0px" top="919.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="160.0px" top="929.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="180.0px" top="912.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="200.0px" top="883.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="220.0px" top="882.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="240.0px" top="883.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="260.0px" top="912.6px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="280.0px" top="929.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="300.0px" top="919.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="320.0px" top="891.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="340.0px" top="781.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="360.0px" top="877.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="380.0px" top="904.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="400.0px" top="927.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="600.0px" top="870.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="620.0px" top="887.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="640.0px" top="916.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="660.0px" top="930.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="680.0px" top="915.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="700.0px" top="887.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="720.0px" top="870.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="740.0px" top="888.3px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="760.0px" top="908.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="780.0px" top="928.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="800.0px" top="922.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="820.0px" top="835.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="840.0px" top="872.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="860.0px" top="875.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="880.0px" top="900.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="900.0px" top="925.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="920.0px" top="927.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="940.0px" top="903.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="960.0px" top="877.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="980.0px" top="787.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1000.0px" top="892.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1020.0px" top="920.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1040.0px" top="929.6px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1060.0px" top="911.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1080.0px" top="979.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1100.0px" top="870.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1120.0px" top="884.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1140.0px" top="913.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1160.0px" top="929.8px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1180.0px" top="919.1px" tooltip="GlitchWave" image="hexie.gif" />

  </div>

  -- ============================================================================
  -- DNAI CORE DATABASE SCHEMA
  -- ============================================================================

  CREATE DATABASE IF NOT EXISTS dnai_core
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

  USE dnai_core;

  -- ============================================================================
  -- 1. CORE REFERENCE TABLES
  -- ============================================================================

  -- 1.1 Symbols (A, T, C, G)
  CREATE TABLE symbols (
  id          TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code        CHAR(1) NOT NULL UNIQUE,   -- 'A', 'T', 'C', 'G'
  name        VARCHAR(64) NOT NULL,      -- Amplify, Transform, Constrain, Generate
  description TEXT NULL
  ) ENGINE=InnoDB;

  INSERT INTO symbols (code, name, description) VALUES
  ('A', 'Amplify',   'Expands the prompt into divergent possibilities.'),
  ('T', 'Transform', 'Mutates structure, reframes context, shifts perspective.'),
  ('C', 'Constrain', 'Applies logic, feasibility, coherence, rules.'),
  ('G', 'Generate',  'Produces concrete forms: code, text, diagrams, architectures.');

  -- 1.2 Modules (20 emergent processing modules)
  CREATE TABLE modules (
  id          SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code        VARCHAR(32) NOT NULL UNIQUE,  -- e.g. EXPLORATORY_BLOOM
  name        VARCHAR(128) NOT NULL,
  description TEXT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  -- Seed 20 conceptual modules (you can refine names later)
  INSERT INTO modules (code, name, description) VALUES
  ('EXPLORATORY_BLOOM',        'Exploratory Bloom Module',        'High-divergence idea expansion.'),
  ('STRUCTURAL_COMPRESSION',   'Structural Compression Module',   'Compresses many branches into coherent structures.'),
  ('RECURSIVE_MUTATION',       'Recursive Mutation Module',       'Iterative mutation of structures and ideas.'),
  ('FEASIBILITY_SYNTHESIS',    'Feasibility Synthesis Module',    'Evaluates and synthesizes feasible paths.'),
  ('NARRATIVE_EXPANSION',      'Narrative Expansion Module',      'Expands prompts into narrative structures.'),
  ('TECHNICAL_ARCHITECTURE',   'Technical Architecture Module',   'Generates system and code architectures.'),
  ('CONSTRAINT_OPTIMIZATION',  'Constraint-Driven Optimization',  'Optimizes under constraints (time, cost, complexity).'),
  ('TEMPORAL_BLOOM',           'Temporal Bloom Module',           'Handles time-linked information bloom.'),
  ('META_PATTERN_EXTRACTION',  'Meta-Pattern Extraction Module',  'Extracts patterns across prompts and outputs.'),
  ('EMERGENT_COHERENCE',       'Emergent Coherence Module',       'Ensures global coherence of outputs.'),
  ('EVALUATION_SCORING',       'Evaluation & Scoring Module',     'Scores branches and outcomes.'),
  ('SELECTION_PRUNING',        'Selection & Pruning Module',      'Prunes non-viable branches.'),
  ('ADAPTIVE_LEARNING',        'Adaptive Learning Module',        'Adapts behavior based on prior runs.'),
  ('CONTEXT_INTEGRATION',      'Context Integration Module',      'Integrates external context and constraints.'),
  ('MULTIMODAL_SYNTHESIS',     'Multimodal Synthesis Module',     'Combines text, code, diagrams, etc.'),
  ('RISK_MANAGEMENT',          'Risk Management Module',          'Assesses and mitigates risk in outcomes.'),
  ('EXPLAINABILITY',           'Explainability Module',           'Generates human-readable rationales.'),
  ('USER_ALIGNMENT',           'User Alignment Module',           'Aligns outputs with user intent and values.'),
  ('EXPERIMENTAL_MODE',        'Experimental Mode Module',        'Allows high-risk, high-creativity exploration.'),
  ('STABILITY_ANCHOR',         'Stability Anchor Module',         'Prevents collapse into incoherence.');

  -- ============================================================================
  -- 2. CODONS (64 TRIPLETS OF SYMBOLS)
  -- ============================================================================

  -- 2.1 Codons table
  CREATE TABLE codons (
  id              SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  triplet         CHAR(3) NOT NULL UNIQUE,  -- e.g. 'ATG'
  description     TEXT NULL,
  default_module_id SMALLINT UNSIGNED NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_codons_default_module
  FOREIGN KEY (default_module_id) REFERENCES modules(id)
  ON UPDATE CASCADE ON DELETE SET NULL
  ) ENGINE=InnoDB;

  -- 2.2 Codon <-> Symbol positions (normalized representation of each position)
  CREATE TABLE codon_symbols (
  codon_id    SMALLINT UNSIGNED NOT NULL,
  position    TINYINT UNSIGNED NOT NULL, -- 1, 2, or 3
  symbol_id   TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (codon_id, position),
  CONSTRAINT fk_codon_symbols_codon
  FOREIGN KEY (codon_id) REFERENCES codons(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_codon_symbols_symbol
  FOREIGN KEY (symbol_id) REFERENCES symbols(id)
  ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_codon_position CHECK (position BETWEEN 1 AND 3)
  ) ENGINE=InnoDB;

  -- 2.3 Codon <-> Module mapping (like codon → amino acid)
  CREATE TABLE codon_module_map (
  codon_id    SMALLINT UNSIGNED NOT NULL,
  module_id   SMALLINT UNSIGNED NOT NULL,
  weight      DECIMAL(5,4) NOT NULL DEFAULT 1.0000, -- relative influence
  PRIMARY KEY (codon_id, module_id),
  CONSTRAINT fk_codon_module_codon
  FOREIGN KEY (codon_id) REFERENCES codons(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_codon_module_module
  FOREIGN KEY (module_id) REFERENCES modules(id)
  ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  -- You can later INSERT the 64 codons and map them to modules as needed.

  -- ============================================================================
  -- 3. PROMPTS & RUNS (TEMPORAL BLOOM CONTEXT)
  -- ============================================================================

  -- 3.1 User prompts
  CREATE TABLE prompts (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_identifier VARCHAR(128) NULL, -- can be user id, hash, etc.
  raw_prompt      TEXT NOT NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  -- 3.2 Processing runs (each run = one full DNAI processing cycle)
  CREATE TABLE processing_runs (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  prompt_id       BIGINT UNSIGNED NOT NULL,
  run_label       VARCHAR(128) NULL,
  status          ENUM('PENDING','RUNNING','COMPLETED','FAILED') NOT NULL DEFAULT 'PENDING',
  started_at      TIMESTAMP NULL,
  completed_at    TIMESTAMP NULL,
  metadata        JSON NULL,
  CONSTRAINT fk_runs_prompt
  FOREIGN KEY (prompt_id) REFERENCES prompts(id)
  ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  -- ============================================================================
  -- 4. FOLDING RULES (HOW MODULES & CODONS INTERACT)
  -- ============================================================================

  CREATE TABLE folding_rules (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name            VARCHAR(128) NOT NULL,
  description     TEXT NULL,
  priority        INT NOT NULL DEFAULT 100, -- lower = higher priority
  is_active       TINYINT(1) NOT NULL DEFAULT 1,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  -- Folding rule targets: codon, module, or codon+module
  CREATE TABLE folding_rule_targets (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  folding_rule_id BIGINT UNSIGNED NOT NULL,
  codon_id        SMALLINT UNSIGNED NULL,
  module_id       SMALLINT UNSIGNED NULL,
  condition_json  JSON NULL, -- optional structured condition
  CONSTRAINT fk_folding_rule_targets_rule
  FOREIGN KEY (folding_rule_id) REFERENCES folding_rules(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_folding_rule_targets_codon
  FOREIGN KEY (codon_id) REFERENCES codons(id)
  ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_folding_rule_targets_module
  FOREIGN KEY (module_id) REFERENCES modules(id)
  ON UPDATE CASCADE ON DELETE SET NULL
  ) ENGINE=InnoDB;

  -- ============================================================================
  -- 5. VIABILITY FILTERS (WHICH BRANCHES SURVIVE)
  -- ============================================================================

  CREATE TABLE viability_filters (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name            VARCHAR(128) NOT NULL,
  description     TEXT NULL,
  filter_type     ENUM('STRUCTURAL','SEMANTIC','TECHNICAL','RISK','ALIGNMENT') NOT NULL,
  is_active       TINYINT(1) NOT NULL DEFAULT 1,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  CREATE TABLE viability_filter_rules (
  id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  viability_filter_id BIGINT UNSIGNED NOT NULL,
  rule_expression     TEXT NOT NULL, -- e.g. DSL, JSON logic, etc.
  severity            ENUM('INFO','WARN','BLOCK') NOT NULL DEFAULT 'WARN',
  CONSTRAINT fk_viability_filter_rules_filter
  FOREIGN KEY (viability_filter_id) REFERENCES viability_filters(id)
  ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  -- ============================================================================
  -- 6. MUTATION ENGINE (HOW VARIANTS ARE GENERATED)
  -- ============================================================================

  CREATE TABLE mutation_strategies (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name            VARCHAR(128) NOT NULL,
  description     TEXT NULL,
  mutation_type   ENUM('SYMBOL_LEVEL','CODON_LEVEL','MODULE_LEVEL','STRUCTURAL','SEMANTIC') NOT NULL,
  intensity       TINYINT UNSIGNED NOT NULL DEFAULT 5, -- 1-10 scale
  is_active       TINYINT(1) NOT NULL DEFAULT 1,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  -- Optional: link mutation strategies to modules (some modules may favor certain mutations)
  CREATE TABLE mutation_strategy_modules (
  mutation_strategy_id BIGINT UNSIGNED NOT NULL,
  module_id            SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (mutation_strategy_id, module_id),
  CONSTRAINT fk_mutation_strategy_modules_strategy
  FOREIGN KEY (mutation_strategy_id) REFERENCES mutation_strategies(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_mutation_strategy_modules_module
  FOREIGN KEY (module_id) REFERENCES modules(id)
  ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  -- ============================================================================
  -- 7. TEMPORAL BLOOM MECHANICS
  -- ============================================================================

  CREATE TABLE temporal_mechanics (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name            VARCHAR(128) NOT NULL,
  description     TEXT NULL,
  time_scope      ENUM('INTRA_RUN','CROSS_RUN','LONGITUDINAL') NOT NULL,
  is_active       TINYINT(1) NOT NULL DEFAULT 1,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  -- Link temporal mechanics to runs (how time-aware behavior was applied)
  CREATE TABLE run_temporal_mechanics (
  id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  processing_run_id   BIGINT UNSIGNED NOT NULL,
  temporal_mechanic_id BIGINT UNSIGNED NOT NULL,
  parameters          JSON NULL,
  applied_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_run_temporal_mechanics_run
  FOREIGN KEY (processing_run_id) REFERENCES processing_runs(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_run_temporal_mechanics_mechanic
  FOREIGN KEY (temporal_mechanic_id) REFERENCES temporal_mechanics(id)
  ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  -- ============================================================================
  -- 8. BRANCHES & OUTPUTS (BILLIONS → VIABLE FORMS)
  -- ============================================================================

  -- 8.1 Branches generated during a run
  CREATE TABLE branches (
  id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  processing_run_id   BIGINT UNSIGNED NOT NULL,
  parent_branch_id    BIGINT UNSIGNED NULL,
  codon_id            SMALLINT UNSIGNED NULL,
  module_id           SMALLINT UNSIGNED NULL,
  mutation_strategy_id BIGINT UNSIGNED NULL,
  viability_score     DECIMAL(6,3) NULL,
  status              ENUM('CANDIDATE','PRUNED','VIABLE','SELECTED') NOT NULL DEFAULT 'CANDIDATE',
  metadata            JSON NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_branches_run
  FOREIGN KEY (processing_run_id) REFERENCES processing_runs(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_branches_parent
  FOREIGN KEY (parent_branch_id) REFERENCES branches(id)
  ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_branches_codon
  FOREIGN KEY (codon_id) REFERENCES codons(id)
  ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_branches_module
  FOREIGN KEY (module_id) REFERENCES modules(id)
  ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_branches_mutation_strategy
  FOREIGN KEY (mutation_strategy_id) REFERENCES mutation_strategies(id)
  ON UPDATE CASCADE ON DELETE SET NULL
  ) ENGINE=InnoDB;

  -- 8.2 Final outputs (collapsed viable forms)
  CREATE TABLE outputs (
  id                  BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  processing_run_id   BIGINT UNSIGNED NOT NULL,
  branch_id           BIGINT UNSIGNED NULL,
  output_type         ENUM('CODE','TEXT','STRUCTURE','MIXED') NOT NULL,
  content             LONGTEXT NOT NULL,
  summary             TEXT NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_outputs_run
  FOREIGN KEY (processing_run_id) REFERENCES processing_runs(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_outputs_branch
  FOREIGN KEY (branch_id) REFERENCES branches(id)
  ON UPDATE CASCADE ON DELETE SET NULL
  ) ENGINE=InnoDB;

  -- ============================================================================
  -- 9. INDEXING & PERFORMANCE TUNING
  -- ============================================================================

  CREATE INDEX idx_prompts_created_at ON prompts (created_at);
  CREATE INDEX idx_runs_prompt ON processing_runs (prompt_id);
  CREATE INDEX idx_runs_status ON processing_runs (status);
  CREATE INDEX idx_branches_run ON branches (processing_run_id);
  CREATE INDEX idx_branches_status ON branches (status);
  CREATE INDEX idx_outputs_run ON outputs (processing_run_id);
  CREATE INDEX idx_codons_triplet ON codons (triplet);


</template>

<script setup>
</script>
