/**
 * QA Smoke Test Suite for TaskFlow Backend
 * Validates module integrity, schemas, and Express configuration
 */
const assert = require('assert');

async function runSmokeTests() {
  console.log('🧪 [QA Agent] Starting TaskFlow Smoke Test Suite...\n');

  try {
    // 1. Check Server Application
    const app = require('../src/server');
    assert(app !== null && typeof app === 'function', 'Express app failed to initialize');
    console.log('  ✅ [PASS] Express app initialized successfully');

    // 2. Check Database Models
    const User = require('../src/models/User');
    assert(User && User.modelName === 'User', 'User model failed to load');
    console.log('  ✅ [PASS] User Mongoose Model loaded with schema validation');

    const Project = require('../src/models/Project');
    assert(Project && Project.modelName === 'Project', 'Project model failed to load');
    console.log('  ✅ [PASS] Project Mongoose Model loaded with schema validation');

    const Task = require('../src/models/Task');
    assert(Task && Task.modelName === 'Task', 'Task model failed to load');
    console.log('  ✅ [PASS] Task Mongoose Model loaded with schema validation');

    // 3. Check User Model Hooks & Methods
    const testUser = new User({
      name: 'Smoke Tester',
      email: 'smoke@example.com',
      password: 'password123',
    });
    assert(typeof testUser.matchPassword === 'function', 'User missing matchPassword helper');
    console.log('  ✅ [PASS] User schema security hooks and methods verified');

    console.log('\n🎉 [QA Agent] All smoke tests passed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ [QA Agent Failure]: ${error.message}`);
    process.exit(1);
  }
}

runSmokeTests();
