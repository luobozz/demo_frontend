import Mock from './Mock'

if (process.env.NODE_ENV === 'development'||process.env.NODE_ENV ==='test') {
    console.log('[DEVELOP_MOCK] mock starting...')

    require('./services/test-mock')

    console.log('[DEVELOP_MOCK] mock has mounted...')
}