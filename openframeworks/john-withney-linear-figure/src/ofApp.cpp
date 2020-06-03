#include "ofApp.h"
#define MAX_SCREEN 200
#define MAX_SIZE 200

float pos_a[2], size_a[2];
float angle_a, phase_a;

float pos_b[2], size_b[2];
float angle_b, phase_b;

float radians(float n) {
    return n * PI / 180.0;
}
float getScreenPosition(float p) {
    return ofMap(p, -1, 1, -MAX_SCREEN, MAX_SCREEN);
}
float getSize(float s) {
    return ofMap(s, -1, 1, 50, MAX_SIZE);
}
void drawEllipses() {
    float x = getScreenPosition(pos_a[0]);
    float y = getScreenPosition(pos_a[1]);
    float w = getSize(size_a[0]);
    float h = getSize(size_a[1]);
    ofPushMatrix();
    ofTranslate(x, y);
    ofRotateRad(angle_a);
    ofDrawRectangle(-w/2, -h/2, w, h);
    ofDrawEllipse(0, 0, w, h);
    ofPopMatrix();
    x = getScreenPosition(pos_b[0]);
    y = getScreenPosition(pos_b[1]);
    w = getSize(size_b[0]);
    h = getSize(size_b[1]);
    ofPushMatrix();
    ofTranslate(x, y);
    ofRotateRad(angle_b);
    ofDrawEllipse(0, 0, w, h);
    ofPopMatrix();
}

void drawPositionVector() {
    ofDrawLine(0, 0, getScreenPosition(pos_a[0]), getScreenPosition(pos_a[1]));
    ofDrawLine(0, 0, getScreenPosition(pos_b[0]), getScreenPosition(pos_b[1]));
}

void drawFingers() {
    ofPushMatrix();
        ofTranslate(getScreenPosition(pos_a[0]), getScreenPosition(pos_a[1]));
        ofRotateRad(angle_a);
        for(int i = 0; i < 30; i++) {
            float w = getSize(size_a[0])/2;
            float h = getSize(size_a[1])/2;
            float x = ofMap(cos(phase_a + i * PI/30), -1, 1, -w, w);
            float y = ofMap(sin(phase_a + i * PI/30), -1, 1, -h, h);
            ofDrawLine(0, 0, x, y);
        }
    ofPopMatrix();
    ofPushMatrix();
    ofTranslate(getScreenPosition(pos_b[0]), getScreenPosition(pos_b[1]));
    ofRotateRad(angle_b);
    for(int i = 0; i < 30; i++) {
        float w = getSize(size_b[0])/2;
        float h = getSize(size_b[1])/2;
        float x = ofMap(cos(phase_a + i * PI/30), -1, 1, -w, w);
        float y = ofMap(sin(phase_a + i * PI/30), -1, 1, -h, h);
        ofDrawLine(0, 0, x, y);
    }
    ofPopMatrix();
}

void drawLines() {
    // Absolute position of ellipse
    float pax = getScreenPosition(pos_a[0]);
    float pay = getScreenPosition(pos_a[1]);
    float pbx = getScreenPosition(pos_b[0]);
    float pby = getScreenPosition(pos_b[1]);
    // Unitary magnitude for fingers
    float mag = sqrt(2);
    for(int i = 0; i < 30; i++) {
        // --------- GROUP A -----------------
        // Rotated position of unitary finger
        float _xa = mag * cos(phase_a + i * PI/30);
        float _ya = mag * sin(phase_a + i * PI/30);
        // Scaled position for finger
        float wa = getSize(size_a[0])/2;
        float ha = getSize(size_a[1])/2;
        _xa = ofMap(_xa, -mag, mag, -wa, wa);
        _ya = ofMap(_ya, -mag, mag, -ha, ha);
        // Rotate scaled finger https://en.wikipedia.org/wiki/Rotation_matrix
        float __xa = _xa * cos(angle_a) - _ya * sin(angle_a);
        float __ya = _xa * sin(angle_a) + _ya * cos(angle_a);
        
        // --------- GROUP B -----------------
        // Rotated position of unitary finger
        float _xb = mag * cos(phase_b + i * PI/30);
        float _yb = mag * sin(phase_b + i * PI/30);
        // Scaled position for finger
        float wb = getSize(size_b[0])/2;
        float hb = getSize(size_b[1])/2;
        _xb = ofMap(_xb, -mag, mag, -wb, wb);
        _yb = ofMap(_yb, -mag, mag, -hb, hb);
        // Rotate scaled finger https://en.wikipedia.org/wiki/Rotation_matrix
        float __xb = _xb * cos(angle_b) - _yb * sin(angle_b);
        float __yb = _xb * sin(angle_b) + _yb * cos(angle_b);
        
        ofDrawLine(pax + __xa, pay + __ya, pbx + __xb, pby + __yb);
    }
}

//--------------------------------------------------------------
void ofApp::setup(){
    ofEnableSmoothing();
}

//--------------------------------------------------------------
void ofApp::update(){
    float t = ofGetElapsedTimef()/5;
    pos_a[0] = ofMap(sin(t), -1, 1, 0.1, 1) * cos(2*t);
    pos_a[1] = sin(2*t);
    pos_b[0] = ofMap(sin(-t), -1, 1, 0.1, 1) * cos(180+3*t);
    pos_b[1] = sin(2*t)/2;
    size_a[0] = sin(t);
    size_a[1] = sin(2*t);
    size_b[0] = sin(180+2*t);
    size_b[1] = sin(180+t);
    angle_a = t * 2;
    angle_b = 0;
    phase_a = 0;
    phase_b = -t * 4;
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofTranslate(ofGetWidth()/2, ofGetHeight()/2);
    ofScale(1, -1);
    ofNoFill();
    ofSetColor(255, 255, 255);
    ofBackground(10);
    
//    drawEllipses();
//    drawPositionVector();
//    drawFingers();
    drawLines();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
